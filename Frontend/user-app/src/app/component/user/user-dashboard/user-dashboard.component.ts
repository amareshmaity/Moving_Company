import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSideNavbarComponent } from '../user-side-navbar/user-side-navbar.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterOutlet, UserSideNavbarComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
