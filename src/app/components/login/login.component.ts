import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword:boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    if(authService.isLoggedIn()){
      this.router.navigate(['/dashboard']); // redirect if logged In
    }

  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']); // redirect after login
      },
      error: err => {
        this.authService.logout();
        this.errorMessage = 'Invalid username or password';
        console.error(err);
      }
    });
  }
}
