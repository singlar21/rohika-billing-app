import { Component } from '@angular/core';
import { UsersService } from '../../users/create-users/users.service';
import { RohikaUsersService } from '../services/rohika-users.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { OrdersComponent } from "../orders/orders.component";
import { ItemsService } from '../services/items.service';
import { NotificationService } from '../../core/notification/notification.service';

@Component({
  selector: 'app-rohika-users',
  standalone: true,
  imports: [CommonModule, OrdersComponent],
  templateUrl: './rohika-users.component.html',
  styleUrl: './rohika-users.component.less'
})
export class RohikaUsersComponent {
  users:any[]=[];
  itemList:any[]=[];

  constructor(private userService:RohikaUsersService,private itemService:ItemsService,private notificationService: NotificationService) {
    
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

  getItemsListByUser(id:number) {
    this.itemService.getItemsByUserId(id).subscribe({
      next: (response) => {
        this.itemList = response;
      },
      error: (error) => {
        console.error('Error creating items', error);
      }
    });
  }

  deleteUser(id:number) {
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
}
