import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loginUser, logoutUser } from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.reducer';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { NavbarComponent } from '../../../Shared/navbar/navbar.component';


@Component({
  selector: 'app-login',
  imports: [ CommonModule, NavbarComponent],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
 

})
export class LoginComponent {

  constructor(private router: Router, private store: Store<{ auth: AuthState }> ) {}
  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  email = '';
  password = '';


  login() {
    this.store.dispatch(loginUser({ email: this.email, password: this.password }));
  }

  logout() {
    this.store.dispatch(logoutUser());
  }
}
