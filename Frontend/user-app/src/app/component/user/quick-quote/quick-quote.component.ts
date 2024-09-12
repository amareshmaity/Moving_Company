import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ViewServiceService } from '../../../service/view-service.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-quick-quote',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quick-quote.component.html',
  styleUrl: './quick-quote.component.css'
})
export class QuickQuoteComponent implements OnInit {

  serviceList ?: [any];

  constructor(private viewService: ViewServiceService, private userService: UserService){};

  ngOnInit(): void {
    this.viewServices();
  }

  // For retriving select service values
  viewServices(){
    this.viewService.viewServices().subscribe({
      next: (data: any) => {
        this.serviceList = data.serviceData;
        console.log("Service list", this.serviceList);
      },
      error: (error) => {
        console.log("Error for view orders", error);
      }

     });
  }

  // For submitting the form
  onSubmit(quickQuote:NgForm){
    this.userService.userQuickQuote(quickQuote.value).subscribe({
      next: (response: any) => {
        alert("Successful: " + response.message);
        // console.log(response);
        quickQuote.reset(); // Reset the form after successful submission

        // Redirect to admin page after suceesfully creating service
        // this.router.navigate(['/admin']);
      }
    });
  }

  // Function to reset the form
  resetForm(quickQuote: NgForm) {
    quickQuote.resetForm();
  }
}
