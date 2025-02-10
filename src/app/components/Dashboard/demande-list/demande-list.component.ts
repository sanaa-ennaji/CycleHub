import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeRequestComponent } from '../demande-request/demande-request.component';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [CommonModule, DemandeRequestComponent, NavbarComponent],
  templateUrl: './demande-list.component.html',
  styleUrl: './demande-list.component.css'
})
export class DemandeListComponent {

}
