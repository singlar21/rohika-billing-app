import { Component } from '@angular/core';
import { RohikaUsersService } from '../services/rohika-users.service';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from "../orders/orders.component";
import { ItemsService } from '../services/items.service';
import { NotificationService } from '../../core/notification/notification.service';
import { TableSearchPipe } from '../../core/pipes/table-search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { PackagingGroupComponent } from "../packaging-group/packaging-group.component";
import { BillingComponent } from '../billing/billing.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TableFilterPipe } from '../../pipes/table-filter.pipe';


@Component({
  selector: 'app-rohika-users',
  standalone: true,
  imports: [CommonModule, OrdersComponent, TableSearchPipe, FormsModule, NgxPrintModule, PackagingGroupComponent,BillingComponent,TableFilterPipe],
  templateUrl: './rohika-users.component.html',
  styleUrl: './rohika-users.component.less'
})
export class RohikaUsersComponent {
  users: any[] = [];
  itemList: any[] = [];

  selectedUser: any;

  searchText: string = '';

  openPrintDialog: boolean = false;

  selectedUsers: number[] = [];

  filters = {
  name: '',
  aliasName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
  createdAt: ''
};

selectedYear: string = '';
selectedMonth: string = '';
years: number[] = [];
months = [
  { name: 'January', value: '01' },
  { name: 'February', value: '02' },
  { name: 'March', value: '03' },
  { name: 'April', value: '04' },
  { name: 'May', value: '05' },
  { name: 'June', value: '06' },
  { name: 'July', value: '07' },
  { name: 'August', value: '08' },
  { name: 'September', value: '09' },
  { name: 'October', value: '10' },
  { name: 'November', value: '11' },
  { name: 'December', value: '12' }
];


  cardView: boolean =false;
  isPrintLabels: boolean = true;
  errorCount:number = 0;
  indiaOrderCount:number = 0;
  internationalOrderCount:number=0;
  constructor(private userService: RohikaUsersService, private itemService: ItemsService, private notificationService: NotificationService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');

  // Generate years starting from 2025 up to currentYear + 5
  for (let y = 2025; y <= currentYear + 5; y++) {
    this.years.push(y);
  }

  // ✅ Default to current month and year
  this.selectedYear = currentYear.toString();
  this.selectedMonth = currentMonth;
    this.getUserList();
  }

  getUserList() {
    this.spinner.show();

    this.userService.getUsersByTypeAndCurrentMonth('CUSTOMER',+this.selectedMonth,+this.selectedYear).subscribe({
      next: (response) => {
        console.log('', response);
        this.users = response;
        this.indiaOrderCount = this.users.filter(user=> user.country && user.country=='India')?.length;
        this.internationalOrderCount = this.users.filter(user=> !user.country || user.country!='India')?.length;
        this.errorCount = this.users.filter(user=> !user.country || !user.state || user.state == 'null')?.length;
      },
      error: (error) => {
        console.error('Error creating user', error);
      }, complete: () => {
        this.spinner.hide();
      }
    });
  }

  getItemsListByUser(id: number, fromUsers?: boolean,fromBulkPrint?:boolean) {
    this.spinner.show();
    this.itemService.getItemsByUserId(id).subscribe({
      next: (response) => {
        this.itemList = response;
        if (fromUsers) {
          this.openPrintDialog = true;

        }
        if(fromBulkPrint) {
          let user = this.users.find(user => user.id === id);
          this.listOfObjects.push({ "billData": user, "itemsList": this.itemList });
        }
      },
      error: (error) => {
        console.error('Error creating items', error);
      }, complete: () => {
        this.spinner.hide();
      }
    });
  }

  deleteUser(id: number) {
    this.spinner.show();
    this.itemService.deleteUser(id).subscribe({
      next: (response) => {
        this.notificationService.showSuccess("User Deleted Successfully");
        this.getUserList();
      },
      error: (error) => {
        console.error('Error Delete User', error);
      }, complete: () => {
        this.spinner.hide();
      }
    });
  }

  setUser(user: any) {
    console.error(user);
    this.openBulkDialog = false;
    this.getItemsListByUser(user.id, true);

    this.selectedUser = user;
    console.error(this.selectedUser);
  }

  printWindow() {
    let divContentArea = document.getElementById('printArea');
    if (divContentArea) {
      let divContent = divContentArea.innerHTML;
      var originalContent = document.body.innerHTML;

      document.body.innerHTML = divContent;
      window.print();
      document.body.innerHTML = originalContent;
    }
  }


  toggleSelection(userId: number) {
    const index = this.selectedUsers.indexOf(userId);
    if (index === -1) {
      this.selectedUsers.push(userId);
    } else {
      this.selectedUsers.splice(index, 1);
    }
  }

  isSelected(userId: number): boolean {
    return this.selectedUsers.includes(userId);
  }

  toggleSelectAll(event: any) {
    if (event?.target.checked) {
      this.selectedUsers = this.users.map(user => user.id);
    } else {
      this.selectedUsers = [];
    }
  }

  listOfObjects: any;
  openBulkDialog:boolean = false;
  printLabels(labels:boolean) {
    this.listOfObjects = [];
    this.isPrintLabels = labels
    for (let id of this.selectedUsers) {
      this.getItemsListByUser(id, false,true);
      this.openBulkDialog = true;
    }

  }

  toggleView() {
    this.cardView = !this.cardView;
  }

  address:string = '';

  selectUser(user:any) {
    this.selectedUser = user;
    this.address = this.selectedUser.address;
  }

  editUser() {
    this.selectedUser.address = this.address;
    this.userService.updateAddressById(this.selectedUser).subscribe({
      next: (response) => {
        this.notificationService.showSuccess("Address Updated Successfully");
        this.getUserList();
      },
      error: (error) => {
        console.error('Error updating address', error);
      }, complete: () => {
        this.spinner.hide();
      }
    });
  }

  onFilterChange() {
    this.getUserList();
  }

}
