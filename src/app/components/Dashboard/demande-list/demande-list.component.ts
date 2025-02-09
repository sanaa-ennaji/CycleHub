import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeRequestComponent } from '../demande-request/demande-request.component';
@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [CommonModule, DemandeRequestComponent],
  templateUrl: './demande-list.component.html',
  styleUrl: './demande-list.component.css'
})
export class DemandeListComponent {

}
