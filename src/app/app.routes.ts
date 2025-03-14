import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { RohikaUsersComponent } from './components/rohika-users/rohika-users.component';

export const routes: Routes = [

    { path: '', component: RohikaUsersComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'orders', component: RohikaUsersComponent },

];
