import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('txtSearchInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.debouncer
      .pipe(
        // Este operador del pipe vale para que se espere X tiempo para
        // que dejen de pasar valores por el observable y entonces dejar pasar
        // la información a los subscriptores
        debounceTime(300)
      )
      .subscribe( value => {
        this.onValue.emit(value);
      })
  }

  ngOnDestroy(): void {
    // Cerramos la subscripción cuando se destruye el componente, ya que no necesitamos
    // seguir escuchando.
    this.debouncer.unsubscribe();
  }

  emitValue(): void {
    this.onValue.emit(this.tagInput.nativeElement.value);
    this.tagInput.nativeElement.value='';
  }

  onKeyPress( searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

}
