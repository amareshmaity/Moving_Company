import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
@Component({
  selector: 'app-view-orders',
  standalone: true,
  imports: [],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent {
  viewOrderData?: [any];
  constructor(private userService:UserService){};
  ngOnInit(): void {
    this.viewOrders();
  }

  viewOrders(){
    this.userService.viewOrders().subscribe({
      next: (data: any) => {
        this.viewOrderData = data.orderedServices;
        console.log(this.viewOrderData)
      },
      error: (error) => {
        console.log("Error for view orders", error);
      }

     });
  }

}
