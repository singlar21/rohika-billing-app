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



}
