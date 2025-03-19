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

  chartData:any[]=[];

  chart: any;


  constructor(private reportService: ReportService) {

  }

  ngAfterViewInit() {
    this.getReportData();
    this.getBestSellingReportData();
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

  getBestSellingReportData() {
    this.reportService.getBestSelling().subscribe({
      next: (response) => {
        this.chartData = response;
        this.createChart();
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

  createChart() {
    const labels = this.chartData.map(item => item[0]); // Extract product names
    const data = this.chartData.map(item => item[1]); // Extract counts

    this.chart = new Chart("myChart", {
      type: 'bar', // Change to 'pie' or 'doughnut' for different styles
      data: {
        labels: labels,
        datasets: [{
          label: 'Product Sales Count',
          data: data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Monthly Product Sales Report' }
        }
      }
    });
  }
}
