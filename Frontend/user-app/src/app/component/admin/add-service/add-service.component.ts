import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../service/admin.service';
@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {

  constructor(private router: Router, private adminService: AdminService){};


  onSubmit(addService:NgForm){
    this.adminService.addService(addService.value).subscribe({
      next: (response: any) => {
        alert("Successful: " + response.message);
        // console.log(response);
        addService.reset(); // Reset the form after successful submission

        // Redirect to admin page after suceesfully creating service
        this.router.navigate(['/admin']);
      }
      
    });
  }

  // Function to reset the form
  resetForm(form: NgForm) {
    form.resetForm();
  }
}
