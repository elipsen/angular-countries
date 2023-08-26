import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('txtSearchInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  emitValue(): void {
    this.onValue.emit(this.tagInput.nativeElement.value);
    this.tagInput.nativeElement.value='';
  }

}
