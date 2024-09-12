import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-view-services',
  standalone: true,
  imports: [],
  templateUrl: './view-services.component.html',
  styleUrl: './view-services.component.css'
})
export class ViewServicesComponent implements OnInit{
  servicesData?: [any];
  constructor(private adminService: AdminService){};
  ngOnInit(): void {
    this.viewServices();
  }
  viewServices(){
    this.adminService.viewServices().subscribe({
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
}
