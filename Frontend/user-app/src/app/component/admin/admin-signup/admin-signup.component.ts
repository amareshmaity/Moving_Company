import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminSignup } from '../../../models/admin-signup';
import { AdminService } from '../../../service/admin.service';


@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.css'
})
export class AdminSignupComponent {

  errors: any = {};

  constructor(private router: Router, private adminService: AdminService){};

  adminSignupDetails: AdminSignup = {
    name: '',
    email: '',
    password: '',
    rollInCompany: ''

  }


  onSubmit(adminSignup:NgForm){
    console.log(this.adminSignupDetails);
    this.adminService.adminSignup(this.adminSignupDetails).subscribe({
      next: (response: any) => {
        alert("Successful: " + response.message);
        // console.log(response);
        adminSignup.reset(); // Reset the form after successful submission
        this.errors = {}; // Clear any previous errors

        // Redirect to sign-in page on successful sign-up
        this.router.navigate(['/admin/signin']);
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
