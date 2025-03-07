import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone:true,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  imports:[NgFor]
})
export class NotificationComponent implements OnInit {
  notifications: { type: string; message: string }[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notification) => {
      this.notifications.push(notification);
      setTimeout(() => this.dismissNotification(notification), 5000);
    });
  }

  dismissNotification(notification: { type: string; message: string }) {
    this.notifications = this.notifications.filter((n) => n !== notification);
  }
}
