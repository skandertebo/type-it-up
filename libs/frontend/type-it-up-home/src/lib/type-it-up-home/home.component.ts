import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeItUpGameplayComponent } from '@/frontend/type-it-up-gameplay';


@Component({
  selector: 'lib-type-it-up-home',
  standalone: true,
  imports: [CommonModule,TypeItUpGameplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class TypeItUpHomeComponent {}
