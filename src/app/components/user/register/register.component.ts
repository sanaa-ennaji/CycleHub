// src/app/components/demande-request/demande-request.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addCollection } from '../../../store/collection/collection.actions';
import { Collection } from '../../../models/Collection.model';
import { CommonModule } from '@angular/common';
import { Status } from '../../../models/Status.enum';
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { collectionReducer } from '../../../store/collection/collection.reducer';
import { CollectionEffects } from '../../../store/collection/collection.effects';

@Component({
  selector: 'app-demande-request',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    provideStore({ collections: collectionReducer }),
    provideEffects(CollectionEffects),
  ],
  templateUrl: './demande-request.component.html',
  styleUrls: ['./demande-request.component.css'],
})
export class DemandeRequestComponent {
  requestForm: FormGroup;
  isOpen: boolean = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.requestForm = this.fb.group({
      wasteType: ['', Validators.required],
      estimatedWeight: ['', [Validators.required, Validators.min(1000)]],
      address: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      additionalNotes: [''],
    });
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.resetForm();
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const request: Collection = {
        ...this.requestForm.value,
        id: this.generateId(),
        status: Status.PENDING,
      };
      console.log('Dispatching addCollection action:', request);
      this.store.dispatch(addCollection({ collection: request }));
    } else {
      console.error('Form is invalid');
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private resetForm() {
    this.requestForm.reset();
  }
}
