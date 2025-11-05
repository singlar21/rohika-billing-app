import { NgFor } from '@angular/common';
import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserType } from '../../core/model/user.model';
import { RohikaUsersService } from '../services/rohika-users.service';
import { NotificationService } from '../../core/notification/notification.service';


@Component({
  selector: 'app-add-vendor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.less'
})
export class AddVendorComponent {

  @Output() saved = new EventEmitter<void>();

  userService: RohikaUsersService = inject(RohikaUsersService);
  notificationService: NotificationService = inject(NotificationService);
  // modalService:NgbModal = inject(NgbModal);
  // user types for dropdown
  userTypes = Object.values(UserType);

  // Form creation
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email]],
    phone: ['', Validators.required],
    address: [''],
    city: [''],
    state: [''],
    country: ['India', Validators.required],
    pincode: [''],
    userType: [UserType.VENDOR],
    createdAt: [new Date().toISOString().substring(0, 10)],
    aliasName: [''],
    countryCode: [+91]
  });

  // Signals to track form state
  userSignal = signal(this.form.value);
  isValid = computed(() => this.form.valid);

  constructor(private fb: FormBuilder) {
    this.form.valueChanges.subscribe(val => this.userSignal.set(val));
  }

  onSubmit() {
    if (this.form.valid) {
      const userData = this.form.value;

      console.log('Form submitted:', userData);

      this.userService.createVendor(userData).subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          this.notificationService.showSuccess('Data Saved Successfully');
          
          this.form.reset();
          this.saved.emit(); 
        },
        error: (err) => {
          console.error('Error creating user:', err);
        }
      });

    } else {
      this.form.markAllAsTouched();
    }
  }

}
