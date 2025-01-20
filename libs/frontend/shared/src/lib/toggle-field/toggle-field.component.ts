import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'lib-toggle-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-field.component.html',

})
export class ToggleFieldComponent{
  @Input() content: unknown = "";
  @Input() value = false
  @Output() valueChange = new EventEmitter<boolean>();
  
  onToggle(){
    this.value = !this.value
    this.valueChange.emit(this.value)
  }


}
