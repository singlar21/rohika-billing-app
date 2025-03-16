import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-packaging',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packaging.component.html',
  styleUrl: './packaging.component.less'
})
export class PackagingComponent {
  @Input()
  billData: any;  // Stores fetched bill data

  @Input()
  itemsList:any[]=[];
}
