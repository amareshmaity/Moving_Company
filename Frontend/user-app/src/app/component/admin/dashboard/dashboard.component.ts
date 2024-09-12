import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSideNavbarComponent } from '../admin-side-navbar/admin-side-navbar.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, AdminSideNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
