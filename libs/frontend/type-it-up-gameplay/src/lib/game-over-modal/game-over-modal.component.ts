import { ButtonComponent } from '@/frontend/shared';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GameResults } from '../../types';

@Component({
  selector: 'lib-game-over-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './game-over-modal.component.html',
})
export class GameOverModalComponent {
  @Input({ required: true }) results!: GameResults;
  @Output() restartEvent = new EventEmitter();

  constructor(private router: Router) {}
  

  onClick() {
    this.restartEvent.emit()
  }
}
