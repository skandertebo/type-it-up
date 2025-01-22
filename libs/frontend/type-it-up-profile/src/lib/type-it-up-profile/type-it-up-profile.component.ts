import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeItUpUserComponent } from "../type-it-up-user/type-it-up-user.component";

@Component({
  selector: 'lib-type-it-up-profile',
  standalone: true,
  imports: [CommonModule, TypeItUpUserComponent],
  templateUrl: './type-it-up-profile.component.html',
  styleUrl: './type-it-up-profile.component.css',
})
export class TypeItUpProfileComponent {}
