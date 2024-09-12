import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { Signin } from '../../../models/signin';
import { AdminService } from '../../../service/admin.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-admin-signin',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './admin-signin.component.html',
  styleUrl: './admin-signin.component.css'
})
export class AdminSigninComponent {

  errors: any = {};
  constructor(private router: Router, private adminService: AdminService, private authService:AuthService){};

  adminSigninDetails: Signin ={
    email: '',
    password: ''
  }
  onSubmit(adminSignin: NgForm){
    // console.log(this.adminSigninDetails);
    this.adminService.adminSignin(this.adminSigninDetails).subscribe({
      next: (response: any) => {
        alert("Successful: " + response.message);
        adminSignin.reset(); // Reset the form after successful submission
        this.errors = {}; // Clear any previous errors

        this.authService.setLoggedIn(true);
        // Redirect to dashboard page on successful sign-in
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        const validationErrors = error.error;
        this.errors = Object.values(validationErrors).join(' ');
        alert("Error: " + this.errors);
      }
      
    });
  }
}
