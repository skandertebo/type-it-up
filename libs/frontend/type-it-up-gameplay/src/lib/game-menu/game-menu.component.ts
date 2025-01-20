import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToggleFieldComponent} from "@/frontend/shared"
import { GameOptions } from '../../types';
import { ToggleListComponent } from "../../../../shared/src/lib/toggle-list/toggle-list.component";
import { CommonModule } from '@angular/common';
import { DefaultGameOptions } from '../constants';
@Component({
  selector: 'lib-game-menu',
  standalone: true,
  imports: [CommonModule, ToggleListComponent, ToggleFieldComponent],
  templateUrl: './game-menu.component.html',
})
export class GameMenuComponent {
  difficulties = ["easy", "medium", "hard"];
  times = [15, 30, 60];
  @Input() isOngoing = false 
  @Input() options:GameOptions = DefaultGameOptions;
  @Output() optionsChange = new EventEmitter();

}
