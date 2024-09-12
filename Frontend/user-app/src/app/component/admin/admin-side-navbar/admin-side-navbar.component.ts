import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-side-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet ],
  templateUrl: './admin-side-navbar.component.html',
  styleUrl: './admin-side-navbar.component.css'
})
export class AdminSideNavbarComponent {

}
