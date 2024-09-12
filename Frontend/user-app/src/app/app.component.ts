import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

import { AuthService } from './service/auth.service';

import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdminSignupComponent } from './component/admin/admin-signup/admin-signup.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AdminSignupComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private router:Router, private authService:AuthService){}
  title = 'user-app';
  isLoggedIn: boolean = false;
  userType: string = '';
  user?: object;

  ngOnInit(): void {
    this.checkLoginStatus();
  }
  checkLoginStatus() {
    this.authService.checkSession().subscribe({
      next: (response: any) => {
        console.log(response);
        this.isLoggedIn = response.loggedIn;
        const parsedUser = JSON.parse(response.user) as { userid: string, user_type: string };
        this.user = parsedUser;
        this.userType = parsedUser.user_type;
        // console.log(this.user);
        // console.log(response.user.user_type);
        if (this.isLoggedIn && this.user) {
          this.authService.setLoggedIn(this.isLoggedIn);
          if (this.userType === 'admin') this.router.navigate(['/admin']);
          else this.router.navigate(['/user']);
        }
      },
      error: (error) => {
        console.log(error)
      }
      
    });
  }
}
