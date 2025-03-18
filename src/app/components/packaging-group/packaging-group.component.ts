import { Component, Input } from '@angular/core';
import { PackagingComponent } from "../packaging/packaging.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packaging-group',
  standalone: true,
  imports: [PackagingComponent,CommonModule],
  templateUrl: './packaging-group.component.html',
  styleUrl: './packaging-group.component.less'
})
export class PackagingGroupComponent {

  @Input()
  list:any;

  constructor() {

  }

  ngOnInit() {
    console.error(this.list);
  }


}
