import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarItemComponent } from '../type-it-up-navbar-item/type-it-up-navbar-item.component';

@Component({
  selector: 'lib-type-it-up-navbar',
  standalone: true,
  templateUrl: './type-it-up-navbar.component.html',
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
      title: 'Competitions',
      link: '/competitions',
      description: 'Join a competition or view the leaderboard',
    },
  ];
}
