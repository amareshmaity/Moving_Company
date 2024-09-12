import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-side-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './user-side-navbar.component.html',
  styleUrl: './user-side-navbar.component.css'
})
export class UserSideNavbarComponent {

}
