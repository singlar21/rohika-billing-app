import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { VisitService } from './visitors/services/visit.service';
import { NotificationComponent } from './core/notification/notification.component';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { ReportService } from './components/services/report.service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { AuthService } from './components/services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, NotificationComponent, DatePipe, CurrencyPipe, NgxSpinnerModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent  implements OnInit{
  
  title = 'rohika-billing';
  visitCount:any = '';

  currentDate: Date = new Date();

  monthMap:Map<string, number>=new Map<string, number>();

  currentMonthSales: number=0;

  constructor(private reportService:ReportService,private spinner: NgxSpinnerService, private authService:AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.getReportData();
  }
  showSpinner() {
    this.spinner.show();
    setTimeout(() => this.spinner.hide(), 3000);
  }

  
  getReportData() {
    this.showSpinner();
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

  isAuthenticated() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // redirect after logout
  }
  
}
