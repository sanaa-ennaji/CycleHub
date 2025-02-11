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
  filteredCollections: Collection[] = [];
  selectedCollection: Collection | null = null; 
  statusOptions = Object.values(Status); 
  userPoints: number = 0;
  collectorId: number = NaN;  

  ngOnInit() {
    this.getCollectorId();  
    this.loadCollectionsFromLocalStorage();
  }


  
  private getCollectorId() {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    console.log('Logged in user:', user);  
    if (user?.collectorId) {
      this.collectorId = Number(user.collectorId);  
      console.log('Collector ID:', this.collectorId);  
      this.collectorId = NaN; 
    }
  }

  private filterCollections() {
    if (!isNaN(this.collectorId)) {
      this.filteredCollections = this.collections.filter(
        (collection) => collection.collectorId === this.collectorId
      );
    } else {
      this.filteredCollections = this.collections;  
    }
  }
  private loadCollectionsFromLocalStorage() {
    const storedCollections = localStorage.getItem('collections');
    if (storedCollections) {
      this.collections = JSON.parse(storedCollections);
      this.filteredCollections = this.collections.filter(collection => collection.collectorId === this.collectorId);
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



  private saveUserPoints() {
    localStorage.setItem('userPoints', this.userPoints.toString());
  }

  updateStatus() {
    if (this.selectedCollection) {
      const index = this.collections.findIndex(c => c.id === this.selectedCollection?.id);
      if (index !== -1) {
        this.collections[index].status = this.selectedCollection.status;

       
        if (this.selectedCollection.status === Status.CONFIRMED && !this.collections[index].validated) {
          const points = this.calculatePoints(this.selectedCollection);
          this.userPoints += points;
          this.collections[index].validated = true; 
          this.saveUserPoints();
        }

        localStorage.setItem('collections', JSON.stringify(this.collections));
      }
      this.selectedCollection = null;
      this.closeUpdateModal();
    }
  }


  calculatePoints(collection: Collection): number {
    const rate: { [key: string]: number } = {
      "PLASTIC": 2,
      "GLASS": 1,
      "PAPER": 1,
      "METAL": 5
    };
    return (rate[collection.wasteType] || 0) * collection.estimatedWeight;
  }
}

