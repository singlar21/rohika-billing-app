import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications = new Subject<{ type: string; message: string }>();
  notifications$ = this.notifications.asObservable();

  showSuccess(message: string) {
    this.notifications.next({ type: 'success', message });
  }

  showError(message: string) {
    this.notifications.next({ type: 'danger', message });
  }

  showInfo(message: string) {
    this.notifications.next({ type: 'info', message });
  }

  showWarning(message: string) {
    this.notifications.next({ type: 'warning', message });
  }
}
