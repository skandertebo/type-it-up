import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToggleFieldComponent } from "../toggle-field/toggle-field.component";

@Component({
  selector: 'lib-toggle-list',
  standalone: true,
  imports: [ToggleFieldComponent],
  templateUrl: './toggle-list.component.html'
})
export class ToggleListComponent implements OnInit{
  @Input() options: Array<string | number> = [];
  @Input() selectedOption: string|number|null = null;
  selectedIndex = -1;
  @Output() selectedOptionChange = new EventEmitter<string|number|null>()

  ngOnInit(){
    if(this.selectedOption) this.selectedIndex = this.options.indexOf(this.selectedOption)
  }

  onToggleChange(index: number, value: boolean) {
    if (value) {
      this.selectedIndex = index;
      this.selectedOptionChange.emit(this.options[this.selectedIndex])
    } else if (this.selectedIndex === index) {
      this.selectedIndex = -1;
      this.selectedOptionChange.emit(null)
    }
  }
}
