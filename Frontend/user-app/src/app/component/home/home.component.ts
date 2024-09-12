import { Component, OnInit } from '@angular/core';
import { ViewServiceService } from '../../service/view-service.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  servicesData?: [any];
  constructor(private viewService: ViewServiceService){};
  ngOnInit(): void {
    this.viewService.viewServices().subscribe({
      next: (data: any) => {
        this.servicesData = data.serviceData;
        console.log(this.servicesData)
        console.log(data.serviceData)
        console.log("Services data", data);
      },
      error: (error) => {
        console.log("Error for view service data", error);
      }
    })
  }
}
