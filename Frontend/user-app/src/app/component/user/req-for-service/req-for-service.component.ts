import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-req-for-service',
  standalone: true,
  imports: [],
  templateUrl: './req-for-service.component.html',
  styleUrl: './req-for-service.component.css'
})
export class ReqForServiceComponent implements OnInit{
  servicesData?: [any];
  constructor(private userService:UserService, private router: Router ){};
  ngOnInit(): void {
    this.viewServices();
  }
  viewServices(){
    this.userService.reqForService().subscribe({
      next: (data: any) => {
        this.servicesData = data.serviceData;
        console.log(this.servicesData)
        console.log(data.serviceData)
        console.log("Services data", data);
      },
      error: (error) => {
        console.log("Error for view service data", error);
      }

     });
  }

  bookService(serviceId: string){
    console.log("Book Service ID", serviceId)
    // this.serviceId = const serviceId;
    this.userService.bookService(serviceId).subscribe({
      next: (data: any) => {
        alert(data.message);
        this.router.navigate(['/user']);
      },
      error: (error) => {
        alert("Error: " + error.error.error);
      }
    })
  }
}
