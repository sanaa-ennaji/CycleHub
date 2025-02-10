import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutUser } from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports : [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  imagePath = 'assets/logo.png';
  currentUser$: Observable<any>; 

  constructor(private router: Router, private store: Store<{ auth: AuthState }>) {
    this.currentUser$ = this.store.select(state => state.auth.currentUser);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.store.dispatch(logoutUser());
    this.router.navigate(['/login']); 
  }
}

