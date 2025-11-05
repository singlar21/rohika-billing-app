import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';
import { TableSearchPipe } from '../../core/pipes/table-search.pipe';
import { FormsModule } from '@angular/forms';
import { PaymentCaptureComponent } from "../payment-capture/payment-capture.component";
import { AddVendorComponent } from "../add-vendor/add-vendor.component";
import { Route, Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-expenselist',
  standalone: true,
  imports: [CommonModule, TableSearchPipe, FormsModule, PaymentCaptureComponent, AddVendorComponent],
  templateUrl: './expenselist.component.html',
  styleUrl: './expenselist.component.less'
})
export class ExpenselistComponent {
  expenseList: any[] = [];

  searchText: string = '';

  @ViewChild('vendorModal') vendorModal!: TemplateRef<any>;
  modalInstance: any;

  expenseService: ExpenseService = inject(ExpenseService);
  router:Router = inject(Router);

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

  closeModal(id:string) {
    const modalEl = document.getElementById(id);
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
      this.refreshRoute();
    }
  }

  onVendorSaved() {
    this.closeModal('vendorModal');
  }

  onExpenseSaved() {
    this.closeModal('paymentModal');
  }

  refreshRoute() {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/expenseList']);
  });
  }

}
