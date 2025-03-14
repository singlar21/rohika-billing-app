import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.less'
})
export class OrdersComponent {

  @Input()
  itemsList:any[]=[];

  get totalAmount(): number {
    return this.itemsList.reduce((sum, item) => sum + item.unitPrice, 0);
  }

}
