import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input({
    required: true
  })
  title !: string;

  @Output()
  closeEvent = new EventEmitter();

  onClickClose() {
    this.closeEvent.emit();
  }

}
