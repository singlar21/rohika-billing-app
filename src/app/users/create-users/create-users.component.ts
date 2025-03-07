import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { UserDetail } from './users.to';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { states } from '../../dropdownLists/states.to'
import { NotificationService } from '../../core/notification/notification.service';
import { sources } from '../../dropdownLists/source.types.to';


@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './create-users.component.html',
  styleUrl: './create-users.component.less'
})
export class CreateUsersComponent {

  detailsForm: FormGroup;
  formSubmitted = false;
  stateList = states;
  countryList = ["India"];
  sourceList = sources;
  source:string | undefined;

  lastUser: string;

  constructor(private fb: FormBuilder, private userService: UsersService, private notificationService: NotificationService) {
    this.lastUser = '';

    this.detailsForm = this.fb.group({
      aliasName: ['JBR', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['', Validators.required],
      code: [''],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]],
      countryCode: ['91', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.detailsForm.valid) {
      const formattedData = {
        businessData: {
          aliasName: this.detailsForm.value.aliasName,
          name: this.detailsForm.value.name,
          address: this.detailsForm.value.address.replace(/\n|\t/g, ' '),
          city: this.detailsForm.value.city,
          state: this.detailsForm.value.state,
          pincode: this.detailsForm.value.pincode,
          country: this.detailsForm.value.country,
          code: this.detailsForm.value.code
        },
        primaryContactData: {
          name: this.detailsForm.value.name,
          phone: this.detailsForm.value.phone,
          email: this.detailsForm.value.email,
          countryCode: this.detailsForm.value.countryCode
        }
      };
      console.log('Formatted Data:', formattedData);
      // Send formattedData to the backend service here.
      this.userService.createUser(formattedData).subscribe({
        next: (response) => {
          console.log('', response);
          this.lastUser = formattedData.businessData.aliasName;
          this.notificationService.showSuccess('User created successfully');
          this.reset();
          // Handle success, such as showing a success message
        },
        error: (error) => {
          console.error('Error creating user', error);
          this.notificationService.showError('Error creating user');
          // Handle error, such as showing an error message
        }
      });
    }
  }

  reset() {
    this.detailsForm.reset({
      aliasName: 'JBR',
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      code: '',
      phone: '',
      email: '',
      countryCode: '91'
    });
    this.notificationService.showWarning('Form reset!');
  }

  changeSourceValue(_$event:any) {
    let shortName = 'JBR';
    if(this.source == 'Instagram') {
      shortName = 'INSTA';
    }
    this.detailsForm.get('aliasName')?.setValue(shortName);
  }


}
