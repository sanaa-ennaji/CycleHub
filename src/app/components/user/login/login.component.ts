import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../Shared/navbar/navbar.component';
@Component({
  selector: 'app-login',
  imports: [ CommonModule , NavbarComponent],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
 

})
export class LoginComponent {

  
}
