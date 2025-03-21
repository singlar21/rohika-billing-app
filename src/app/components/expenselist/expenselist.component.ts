import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenselist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenselist.component.html',
  styleUrl: './expenselist.component.less'
})
export class ExpenselistComponent {
  expenseList:any[]=[];

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
