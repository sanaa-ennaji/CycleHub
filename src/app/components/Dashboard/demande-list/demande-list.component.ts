import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeRequestComponent } from '../demande-request/demande-request.component';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { Collection } from '../../../models/Collection.model';
import { Status } from '../../../models/Status.enum';
import { DemandeUpdateComponent } from '../demande-update/demande-update.component';

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [CommonModule, DemandeRequestComponent, NavbarComponent,  DemandeUpdateComponent ],
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {
  collections: Collection[] = [];
  selectedCollection: Collection | null = null; 
  modalOpen = false; 
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

  deleteCollection(collectionId: string) {
    const collectionIndex = this.collections.findIndex((col) => col.id === collectionId);
    if (collectionIndex !== -1) {
      const collection = this.collections[collectionIndex];
      if (collection.status === Status.PENDING) {
        this.collections.splice(collectionIndex, 1);
        localStorage.setItem('collections', JSON.stringify(this.collections));
        console.log(`Collection with ID: ${collectionId} deleted`);
      } else {
        alert('Collection cannot be deleted because its status is not PENDING');
      }
    }
  }




  openUpdateModal(collection: Collection) {
    this.selectedCollection = { ...collection };  
    this.modalOpen = true;
  }

 
  handleUpdateCollection(updatedCollection: Collection) {
    const index = this.collections.findIndex((col) => col.id === updatedCollection.id);
    if (index !== -1) {
      this.collections[index] = updatedCollection;
      localStorage.setItem('collections', JSON.stringify(this.collections));
      console.log('Collection updated');
    }
    this.modalOpen = false;
  }


  closeModal() {
    this.modalOpen = false;
  }
}
