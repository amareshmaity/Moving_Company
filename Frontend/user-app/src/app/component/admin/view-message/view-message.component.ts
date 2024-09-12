import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-view-message',
  standalone: true,
  imports: [],
  templateUrl: './view-message.component.html',
  styleUrl: './view-message.component.css',
})
export class ViewMessageComponent implements OnInit{
  inquiryData?: [any];
  constructor(private adminService: AdminService){};

  ngOnInit(): void {
    this.viewMessage();
  }
  viewMessage(){
    this.adminService.viewMessage().subscribe({
      next: (data: any) => {
        this.inquiryData = data.inquiryData;
        console.log("view message",  this.inquiryData);
      },
      error: (error) => {
        console.log("Error for view inquiry data", error);
      }
     });
  }

}
