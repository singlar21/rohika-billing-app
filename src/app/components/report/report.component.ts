import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ReportService } from '../services/report.service';


@Component({
  selector: 'app-report',
  standalone: true,
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.less'
})
export class ReportComponent {

  monthMap:Map<string, number>=new Map<string, number>();

  constructor(private reportService: ReportService) {

  }

  ngAfterViewInit() {
    this.getReportData();
  }

  getReportData() {
    this.reportService.getReport().subscribe({
      next: (response) => {

        // Get current year dynamically
        const currentYear = new Date().getFullYear();

        // Generate all months of the year
        for (let i = 1; i <= 12; i++) {
          const formattedMonth = `${currentYear}-${String(i).padStart(2, '0')}`;
          this.monthMap.set(formattedMonth, 0); // Default value if missing
        }

        // Fill in data from JSON
        response.forEach((entry: { month: string; totalAmount: number; }) => {
          this.monthMap.set(entry.month, entry.totalAmount);
        });
        this.loadChart();
      },
      error: (error) => {
        console.error('Error creating items', error);
      }
    });
  }

  loadChart() {
    new Chart("monthlyReportChart", {
      type: 'bar',  // Change to 'line' for a line chart
      data: {
        labels: [...this.monthMap.keys()],
        datasets: [{
          label: 'Monthly Sales (in ₹)',
          data: [...this.monthMap.values()],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
