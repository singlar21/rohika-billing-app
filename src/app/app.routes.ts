import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { RohikaUsersComponent } from './components/rohika-users/rohika-users.component';
import { ReportComponent } from './components/report/report.component';
import { PaymentCaptureComponent } from './components/payment-capture/payment-capture.component';
import { ExpenselistComponent } from './components/expenselist/expenselist.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/guards/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: RohikaUsersComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'expenses', component: PaymentCaptureComponent, canActivate: [AuthGuard] },
  { path: 'expenseList', component: ExpenselistComponent, canActivate: [AuthGuard] }
];
