import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableSearchPipe } from '../../core/pipes/table-search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe,CommonModule,FormsModule,TableSearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.less'
})
export class ProductsComponent {

  products:any[]=[];
  searchText:string='';

  constructor(private productService:ProductService) {
    
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        console.log('', response);
        this.products = response;
        // Handle success, such as showing a success message
      },
      error: (error) => {
        console.error('Error creating user', error);
      }
    });
  }
}
