import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquiry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inquiry.component.html',
  styleUrl: './inquiry.component.css'
})
export class InquiryComponent {
  constructor(private userService:UserService, private router:Router){}

  onSubmit(newInquiry: NgForm){
    this.userService.userNewInquiry(newInquiry.value).subscribe({
      next: (response: any) => {
        alert("Successful: " + response.message);
        // console.log(response);
        newInquiry.reset(); // Reset the form after successful submission

        // Redirect to admin page after suceesfully creating service
        this.router.navigate(['/user']);
      }
      
    });
  }

  // Function to reset the form
  resetForm(newInquiry: NgForm) {
    newInquiry.resetForm();
  }
}
