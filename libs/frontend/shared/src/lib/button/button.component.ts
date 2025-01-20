import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() content = "";
  @Input() disabled = false
  @Output() clickEvent = new EventEmitter();

  onClick(){
    this.clickEvent.emit()
  }
}
