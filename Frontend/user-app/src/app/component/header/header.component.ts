import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  isLoggedIn: boolean = false;
  constructor(private router:Router, private authService: AuthService){}

  ngOnInit(): void {
    // get real time updated value by subscribing isLoggedIn$ observable
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  // When user click on logout button
  onLogout() {
    this.authService.logout().subscribe({
      next: (response:any) => {
        this.isLoggedIn = false;
        this.router.navigate(['/']);
        this.authService.setLoggedIn(false);
      },
      error: error => {
        console.error('Logout failed', error);
      }
    });
  }

}
