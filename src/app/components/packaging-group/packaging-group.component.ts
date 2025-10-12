import { Component, Input } from '@angular/core';
import { PackagingComponent } from "../packaging/packaging.component";
import { CommonModule } from '@angular/common';
import { BillingComponent } from "../billing/billing.component";

@Component({
  selector: 'app-packaging-group',
  standalone: true,
  imports: [PackagingComponent, CommonModule, BillingComponent],
  templateUrl: './packaging-group.component.html',
  styleUrl: './packaging-group.component.less'
})
export class PackagingGroupComponent {

  @Input()
  list:any;

  @Input()
  labels:boolean = true;

  constructor() {

  }

  ngOnInit() {
    console.error(this.list);
  }


}
