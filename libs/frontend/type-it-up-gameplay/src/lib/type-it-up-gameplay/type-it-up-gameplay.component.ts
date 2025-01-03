import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from "../game/game.component";

@Component({
  selector: 'lib-type-it-up-gameplay',
  standalone: true,
  imports: [CommonModule, GameComponent],
  templateUrl: './type-it-up-gameplay.component.html',
  styleUrl: './type-it-up-gameplay.component.css',
})
export class TypeItUpGameplayComponent {}
