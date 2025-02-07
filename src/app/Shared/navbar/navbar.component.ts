import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  imagePath = 'assets/logo.jpg';
  handleImageError() {
    this.imagePath = 'assets/fallback-logo.jpg'; 
  }
}
