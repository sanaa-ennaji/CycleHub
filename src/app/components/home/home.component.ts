import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  
}




