import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { VisitService } from './visitors/services/visit.service';
import { NotificationComponent } from './core/notification/notification.component';
import { ProductsComponent } from "./components/products/products.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent  implements OnInit{
  
  title = 'rohika-billing';
  visitCount:any = '';

  constructor(private visitService:VisitService) {

  }

  ngOnInit(): void {
    this.visitService.getTotalVisitCount().subscribe(count => {
      this.visitService.incrementVisit();
      this.visitCount = count; // Set visit count when data is fetched
    });
  }
  
}
