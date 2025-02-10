import { Component, NgModule, OnInit } from '@angular/core';
import { SidebareComponent } from "../../Shared/sidebare/sidebare.component";
import { Collection } from '../../../models/Collection.model';
import { Status } from '../../../models/Status.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collections-list',
  standalone: true,
  imports: [CommonModule, SidebareComponent, FormsModule],
  templateUrl: './collections-list.component.html',
  styleUrl: './collections-list.component.css'
})
export class CollectionsListComponent implements OnInit {
  collections: Collection[] = [];
  selectedCollection: Collection | null = null; 
  statusOptions = Object.values(Status); 

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

  openUpdateModal(collection: Collection) {
    this.selectedCollection = { ...collection };
  }

  closeUpdateModal() {
    this.selectedCollection = null;
  }

  updateCollectionStatus() {
    if (this.selectedCollection) {
      const index = this.collections.findIndex(c => c.id === this.selectedCollection?.id);
      if (index !== -1) {
        this.collections[index].status = this.selectedCollection.status;
        this.updateLocalStorage();
      }
      this.closeUpdateModal();
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }
}
