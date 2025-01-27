import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-type-it-up-user',
  standalone: true,
  imports: [],
  templateUrl: './type-it-up-user.component.html',
  styleUrl: './type-it-up-user.component.css',
})
export class TypeItUpUserComponent {
  @Input() user = {
    username: '',
    averageWpm: 0,
    averageAccuracy: 0,
    highestScore: 0,
  };
}
