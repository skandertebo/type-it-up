import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ToastrModule} from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [RouterModule, ToastrModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'type-it-up';
}
