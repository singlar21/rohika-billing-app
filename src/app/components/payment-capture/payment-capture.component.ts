import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../users/create-users/users.service';
import { RohikaUsersService } from '../services/rohika-users.service';
import { NgFor } from '@angular/common';
import { ExpenseService } from '../services/expense.service';
import { NotificationService } from '../../core/notification/notification.service';

@Component({
  selector: 'app-payment-capture',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgFor],
  templateUrl: './payment-capture.component.html',
  styleUrl: './payment-capture.component.less'
})
export class PaymentCaptureComponent {
  expenseForm: FormGroup;
  users:any[]=[]

  constructor(private fb: FormBuilder,private userService:RohikaUsersService,private expenseService:ExpenseService, private notificationService: NotificationService) {
    this.expenseForm = this.fb.group({
      userId: ['', Validators.required],
      paidAmount: ['', [Validators.required, Validators.min(0)]],
      paidDate: [new Date().toISOString().split('T')[0]],
      comments: [''],
    });
    this.getUserList();
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      this.saveExpense();
    }
  }

  getUserList() {
    this.userService.getUsersByType('VENDOR').subscribe({
      next: (response) => {
        console.log('', response);
        this.users = response;
      },
      error: (error) => {
        console.error('Error creating user', error);
      }
    });
  }

  saveExpense() {
    this.expenseService.saveExpense(this.expenseForm.value).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Data Saved Successfully');
        this.expenseForm.reset();
      },
      error: (error) => {
        console.error('Error creating user', error);
      }
    });
  }
}
