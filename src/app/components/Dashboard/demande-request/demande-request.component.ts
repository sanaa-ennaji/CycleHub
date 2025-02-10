import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addCollection } from '../../../store/collection/collection.actions';
import { Collection } from '../../../models/Collection.model';
import { CommonModule } from '@angular/common';
import { Status } from '../../../models/Status.enum';
import { selectCollectionState } from '../../../store/collection/collection.selectors';

@Component({
  selector: 'app-demande-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './demande-request.component.html',
  styleUrls: ['./demande-request.component.css']
})
export class DemandeRequestComponent {
  requestForm: FormGroup;
  isOpen: boolean = false;

  constructor(private fb: FormBuilder,
     private store: Store) {
    this.requestForm = this.fb.group({
      wasteType: ['', Validators.required],
      estimatedWeight: ['', [Validators.required, Validators.min(1000)]],
      Address: ['', Validators.required],
      Date: ['', Validators.required],
      TimeSlot: ['', Validators.required],
      additionalNotes: ['']
    });
  }
  ngOnInit(): void {

    const collections = JSON.parse(localStorage.getItem('collections') || '[]');
    this.store.dispatch(addCollection({ collection: collections }));
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
        status: Status.PENDING
      };
      console.log('Dispatching addCollection action:', request);
      this.store.dispatch(addCollection({ collection: request }));
      this.saveToLocalStorage();
      // this.closeModal();
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

  private saveToLocalStorage() {
 
    this.store.select(selectCollectionState).subscribe((collections) => {
      localStorage.setItem('collections', JSON.stringify(collections));
    });
  }
}