import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { Collection } from '../../../models/Collection.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demande-update',
  imports: [CommonModule,FormsModule ],
  templateUrl: './demande-update.component.html',
  styleUrl: './demande-update.component.css'
})
export class DemandeUpdateComponent {
  @Input() collection: Collection | null = null;  
  @Output() updateCollection: EventEmitter<Collection> = new EventEmitter();  
  @Output() closeModal: EventEmitter<void> = new EventEmitter();  

  onUpdateCollection() {
    if (this.collection) {
      this.updateCollection.emit(this.collection);  
    }
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
