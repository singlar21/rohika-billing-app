import { Component, Input } from '@angular/core';
import { BillingService } from '../services/billing.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { NumberToWordsPipe } from '../../core/pipes/number-to-words.pipe';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [FormsModule,CurrencyPipe,CommonModule,NumberToWordsPipe],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.less'
})
export class BillingComponent {

  @Input()
  billData: any;  // Stores fetched bill data

  @Input()
  itemsList:any[]=[];
  
  billId: number = 1;  // Example bill ID (Replace with dynamic input)

  constructor(private billingService: BillingService) { 
    console.log("test")
  }

  fetchBill() {
    this.billingService.getBill(this.billId).subscribe({
      next: (data) => {
        this.billData = data;
      },
      error: (err) => {
        console.error('Error fetching bill:', err);
      }
    });
  }


  get totalAmount(): number {
    return this.itemsList.reduce((sum, item) => sum + item.unitPrice, 0);
  }
}
