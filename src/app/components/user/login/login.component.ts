import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { loginUser, logoutUser } from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.state';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, NavbarComponent, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router, private store: Store<{ auth: AuthState }>) {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  email = '';
  password = '';
  errorMessage = '';

  login() {
    this.store.dispatch(loginUser({ email: this.email, password: this.password }));

    this.store.select('auth').subscribe((authState) => {
      if (authState.currentUser) {
        const currentUser = authState.currentUser;

        if (currentUser.roleId === 1) {
          this.router.navigate(['/demande']); 
        } else if (currentUser.roleId === 2) {
          this.router.navigate(['/requestList']); 
        }
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

}
