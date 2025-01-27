import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {ToastrModule} from 'ngx-toastr'

@Component({
  standalone: true,
  imports: [RouterModule, ToastrModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'type-it-up';
  router = inject(Router)

  navigateToHome(){
    this.router.navigate(['/home'])
  }
}
