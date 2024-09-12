import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-view-quote',
  standalone: true,
  imports: [],
  templateUrl: './view-quote.component.html',
  styleUrl: './view-quote.component.css'
})
export class ViewQuoteComponent implements OnInit{
  quoteData?: [any];
  constructor(private adminService: AdminService){};

  ngOnInit(): void {
    this.viewQuotes();
  }
  
  viewQuotes(){
    this.adminService.viewQuotes().subscribe({
      next: (data: any) => {
        this.quoteData = data.quoteData;
        // console.log("quote data", data);
      },
      error: (error) => {
        console.log("Error for view quote data", error);
      }
     });
  }
}
