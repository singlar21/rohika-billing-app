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


@Component({
  selector: 'app-rohika-users',
  standalone: true,
  imports: [CommonModule, OrdersComponent, TableSearchPipe, FormsModule, NgxPrintModule, PackagingGroupComponent,BillingComponent],
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

  cardView: boolean =true;
  constructor(private userService: RohikaUsersService, private itemService: ItemsService, private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log('', response);
        this.users = response;
        // Handle success, such as showing a success message
      },
      error: (error) => {
        console.error('Error creating user', error);
      }
    });
  }

  getItemsListByUser(id: number, fromUsers?: boolean,fromBulkPrint?:boolean) {
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
      }
    });
  }

  deleteUser(id: number) {
    this.itemService.deleteUser(id).subscribe({
      next: (response) => {
        this.notificationService.showSuccess("User Deleted Successfully");
        this.getUserList();
      },
      error: (error) => {
        console.error('Error Delete User', error);
      }
    });
  }

  setUser(user: any) {
    console.error(user);
    this.openBulkDialog = false;
    this.getItemsListByUser(user.id, true);

    this.selectedUser = user;
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
  printLabels() {
    this.listOfObjects = [];
    for (let id of this.selectedUsers) {
      this.getItemsListByUser(id, false,true);
      this.openBulkDialog = true;
    }

  }

  toggleView() {
    this.cardView = !this.cardView;
  }
}
