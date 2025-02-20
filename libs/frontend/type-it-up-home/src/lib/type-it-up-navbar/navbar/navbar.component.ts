import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarItemComponent } from '../navbar-item/navbar-item.component';

@Component({
  selector: 'lib-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [CommonModule, NavbarItemComponent],
})
export class NavbarComponent {
  navItems = [
    {
      title: 'Home Page',
      link: '/home',
      description: 'Main Game Page for Type It Up',
    },
    {
      title: 'Leaderboard',
      link: '/leaderboard',
      description: 'See the top scores of all time and this week',
    },
    {
      title: 'Profile',
      link: '/profile',
      description: 'View your profile and stats for Type It Up',
    },
    {
      title: 'History',
      link: '/history',
      description: 'View your past games and scores',
    },
  ];
}
