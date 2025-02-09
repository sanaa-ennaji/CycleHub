import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Collection } from '../../../models/Collection.model';
import { CommonModule } from '@angular/common';
import { Status } from '../../../models/Status.enum';
@Component({
  selector: 'app-demande-request',
  standalone: true,
  imports : [ReactiveFormsModule, CommonModule],
  templateUrl: './demande-request.component.html',
  styleUrls: ['./demande-request.component.css']
})

export class DemandeRequestComponent {
  
  collection: Omit<Collection, 'id' | 'status'> = {
    wasteType: WasteType.PLASTIC,
    estimatedWeight: 0,
    Address: '',
    Date: '',
    TimeSlot: '',
    additionalNotes: '',
    photos: [],
  };

  wasteTypes = Object.values(WasteType);

  constructor(private store: Store) {}

  onSubmit(): void {
    const newCollection: Collection = {
      ...this.collection,
      id: uuidv4(), // Generate a unique ID
      status: Status.PENDING, // Default status
    };

    this.store.dispatch(addCollection({ collection: newCollection }));
    alert('Collection request created successfully!');
    this.resetForm();
  }

  resetForm(): void {
    this.collection = {
      wasteType: WasteType.PLASTIC,
      estimatedWeight: 0,
      Address: '',
      Date: '',
      TimeSlot: '',
      additionalNotes: '',
      photos: [],
    };
  }
}