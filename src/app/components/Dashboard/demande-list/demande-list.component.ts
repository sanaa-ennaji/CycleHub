import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeRequestComponent } from '../demande-request/demande-request.component';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { Collection } from '../../../models/Collection.model';
import { Status } from '../../../models/Status.enum';

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [CommonModule, DemandeRequestComponent, NavbarComponent],
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {
  collections: Collection[] = [];

  ngOnInit() {
    this.loadCollectionsFromLocalStorage();
  }

  private loadCollectionsFromLocalStorage() {
    const storedCollections = localStorage.getItem('collections');
    if (storedCollections) {
      this.collections = JSON.parse(storedCollections);
    }
  }

  getStatusLabel(status: number): string {
    return Status[status]; 
  }
}
