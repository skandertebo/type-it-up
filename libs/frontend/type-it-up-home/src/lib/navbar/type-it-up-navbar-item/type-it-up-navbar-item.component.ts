import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-type-it-up-navbar-item',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './type-it-up-navbar-item.component.html',
})
export class NavbarItemComponent {
  @Input() title!: string;
  @Input() link!: string;
  @Input() description!: string;
}