import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { UserSignup } from '../../../models/user-signup';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  errors: any = {};

  constructor(private router: Router, private userService: UserService){};

  userSignupDetails: UserSignup = {
    name:'',
    age: '',
    email: '',
    mobile: '',
    password: '',
    addressStreet: '',
    addressCity: '',
    addressState: ''

  }


  onSubmit(userSignup:NgForm){
    console.log(this.userSignupDetails);
    this.userService.userSignup(this.userSignupDetails).subscribe({
      next: (response: any) => {
        alert("Successful: " + response.message);
        // console.log(response);
        userSignup.reset(); // Reset the form after successful submission
        this.errors = {}; // Clear any previous errors

        // Redirect to sign-in page on successful sign-up
        this.router.navigate(['/user/signin']);
      },
      error: (error) => {
        // console.log("Error:", error.error.errors);
        const validationErrors = error.error.errors;
        this.errors = Object.values(validationErrors).join(' ');
        // this.signupMsg = validationErrors;

        alert("Error: " + this.errors);
      }
      
    });
  }
}
