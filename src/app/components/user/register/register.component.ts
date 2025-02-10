import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerUser } from '../../../store/auth/auth.actions';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule , NavbarComponent],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
    
  )
   {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
    });

  }

  onRegister() {
    if (this.registerForm.valid) {
      const user: User = {
        id: this.generateId(), 
        roleId: 1 ,  
        ...this.registerForm.value,
      };

      this.store.dispatch(registerUser({ user }));
      this.router.navigate(['/login']);
    }
  }
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}