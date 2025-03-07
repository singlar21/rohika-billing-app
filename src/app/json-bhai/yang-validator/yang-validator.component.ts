import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YangValidatorService } from '../services/yang-validator.service';

@Component({
  standalone: true,
  selector: 'app-yang-validator',
  templateUrl: './yang-validator.component.html',
  styleUrls: ['./yang-validator.component.less'],
  imports: [CommonModule, FormsModule],
})
export class YangValidatorComponent {
  yangCode = '';
  validationErrors: string[] = [];

  validated:boolean = false;

  constructor(private validator: YangValidatorService) {}

  validateYang() {
    this.validationErrors = this.validator.validate(this.yangCode);
    this.validated = true;
  }

  reset() {
    this.yangCode = '';
    this.validated = false;
  }

}
