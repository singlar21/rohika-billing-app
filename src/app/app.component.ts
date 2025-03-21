import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { VisitService } from './visitors/services/visit.service';
import { NotificationComponent } from './core/notification/notification.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ReportService } from './components/services/report.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, NotificationComponent,DatePipe,CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent  implements OnInit{
  
  title = 'rohika-billing';
  visitCount:any = '';

  currentDate: Date = new Date();

  monthMap:Map<string, number>=new Map<string, number>();

  currentMonthSales: number=0;

  constructor(private reportService:ReportService) {

  }

  ngOnInit(): void {
    this.getReportData();
  }
  
  getReportData() {
    this.reportService.getReport().subscribe({
      next: (response) => {
        // Get current year and month dynamically
        const currentYear = new Date().getFullYear();
        const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
        const currentFormattedMonth = `${currentYear}-${currentMonth}`;
  
        // Generate all months of the year with default values
        for (let i = 1; i <= 12; i++) {
          const formattedMonth = `${currentYear}-${String(i).padStart(2, '0')}`;
          this.monthMap.set(formattedMonth, 0);
        }
  
        // Fill in data from JSON
        response.forEach((entry: { month: string; totalAmount: number }) => {
          this.monthMap.set(entry.month, entry.totalAmount);
        });
  
        // Assign the current month's sales
        this.currentMonthSales = this.monthMap.get(currentFormattedMonth) || 0;
      },
      error: (error) => {
        console.error('Error fetching report data', error);
      }
    });
  }
  
}
