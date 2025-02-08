import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';
import { Store } from '@ngrx/store';
import { addRequest } from '../../../store/collection/collection.actions';
import { Collection } from '../../../models/Collection.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-demande-request',
  standalone: true,
  imports : [ReactiveFormsModule, CommonModule],
  templateUrl: './demande-request.component.html',
  styleUrls: ['./demande-request.component.css']
})

export class DemandeRequestComponent {
  requestForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.requestForm = this.fb.group({
      wasteType: ['', Validators.required],
      estimatedWeight: ['', [Validators.required, Validators.min(1000)]],
      Address: ['', Validators.required],
      Date: ['', Validators.required],
      TimeSlot: ['', Validators.required],
      additionalNotes: ['']
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const request: Collection = {
        ...this.requestForm.value,
        id: this.generateId(),
        status: 'PENDING'
      };
      console.log('Dispatching addRequest action with request:', request); // Debug
      this.store.dispatch(addRequest({ request }));
      this.requestForm.reset(); // Reset the form after submission
    } else {
      console.error('Form is invalid'); // Debug
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}