import { Component } from '@angular/core';
import { SidebareComponent } from "../../Shared/sidebare/sidebare.component";
import { CommonModule } from '@angular/common';
import { Collection } from '../../../models/Collection.model';
import { Status } from '../../../models/Status.enum';
@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [SidebareComponent, CommonModule],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {
  collections: Collection[] = [];
  currentUser: any = null;

  ngOnInit() {
    this.loadCollectionsFromLocalStorage();
    this.loadCurrentUser();
  }

  private loadCollectionsFromLocalStorage() {
    const storedCollections = localStorage.getItem('collections');
    if (storedCollections) {
      this.collections = JSON.parse(storedCollections);
    }
  }

  private loadCurrentUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  getStatusLabel(status: number): string {
    return Status[status]; 
  }

  reserveCollection(collection: Collection) {
    if (collection.status === Status.PENDING && this.currentUser) {
      collection.status = Status.RESERVED;
      collection.collectorId = this.currentUser.id; 
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }
}
