import { Component, OnInit } from '@angular/core';
import {NgClass} from '@angular/common';
import { AdminService } from '../../../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [NgClass],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css'
})
export class ViewOrderComponent implements OnInit {

  viewOrderData?: [any];
  orderDetailsData?: [any];
  userName?: string;
  isShow: boolean = true;
  constructor(private router:Router, private adminService:AdminService){}
  ngOnInit(): void {
    this.viewOrders();
  }

  viewOrders(){
    this.adminService.viewOrder().subscribe({
      next: (data: any) => {
        this.viewOrderData = data.Orders;
        console.log(this.viewOrderData)
      },
      error: (error) => {
        console.log("Error for view orders", error);
      }

     });
  }

  viewOrderDetails(bookedService: any){
    console.log("Book Service Details", bookedService)
    this.userName = bookedService.name;
    this.adminService.viewOrderDetails(bookedService.bookedService).subscribe({
      next: (data: any) => {
        this.isShow = false;
        this.orderDetailsData = data.orderDetails;
        console.log(this.orderDetailsData);
        // alert(data.message);
        // this.router.navigate(['/user']);
      },
      error: (error) => {
        alert("Error: " + error.error.error);
      }
    })
  }

  goBack(){
    this.isShow = true;
    this.router.navigate(['/admin/viewOrder']);
  }

}
