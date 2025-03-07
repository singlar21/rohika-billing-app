import { Component } from '@angular/core';
import { UsersService } from '../../users/create-users/users.service';
import { RohikaUsersService } from '../services/rohika-users.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-rohika-users',
  standalone: true,
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './rohika-users.component.html',
  styleUrl: './rohika-users.component.less'
})
export class RohikaUsersComponent {
  users:any[]=[];

  constructor(private userService:RohikaUsersService) {
    
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
}
