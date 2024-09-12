import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


import { Signin } from '../../../models/signin';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-user-signin',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './user-signin.component.html',
  styleUrl: './user-signin.component.css'
})
export class UserSigninComponent {

  errors: any = {};
  constructor(private router: Router, private userService: UserService, private authService:AuthService){};

  userSigninDetails: Signin ={
    email: '',
    password: ''
  }
  onSubmit(userSignin: NgForm){
    // console.log(this.adminSigninDetails);
    this.userService.userSignin(this.userSigninDetails).subscribe({
      next: (response: any) => {
        alert("Successful: " + response.message);
        userSignin.reset(); // Reset the form after successful submission
        this.errors = {}; // Clear any previous errors

        this.authService.setLoggedIn(true);
        // Redirect to dashboard page on successful sign-in
        this.router.navigate(['/user']);
      },
      error: (error) => {
        const validationErrors = error.error;
        this.errors = Object.values(validationErrors).join(' ');
        alert("Error: " + this.errors);
      }
      
    });
  }

}
