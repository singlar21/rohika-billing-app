import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';
import { TableSearchPipe } from '../../core/pipes/table-search.pipe';
import { FormsModule } from '@angular/forms';
import { BillingComponent } from "../billing/billing.component";
import { PaymentCaptureComponent } from "../payment-capture/payment-capture.component";

@Component({
  selector: 'app-expenselist',
  standalone: true,
  imports: [CommonModule, TableSearchPipe, FormsModule, PaymentCaptureComponent],
  templateUrl: './expenselist.component.html',
  styleUrl: './expenselist.component.less'
})
export class ExpenselistComponent {
  expenseList:any[]=[];

  searchText: string = '';

  constructor(private expenseService:ExpenseService) {

  }

  ngOnInit() {
    this.getExpenseList();

  }

  getExpenseList() {
    this.expenseService.getExpenseList().subscribe({
      next: (response) => {
        this.expenseList = response;
      },
      error: (error) => {
        console.error('Error creating user', error);
      }
    });
  }
 }
