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
        status: Status.PENDING
      };
      console.log(localStorage);
      // console.log('Dispatching addRequest action with request:', request); 
      this.store.dispatch(addRequest({ request }));
      // this.requestForm.reset(); 
    } else {
      console.error('Form is invalid'); 
    }

  }
  

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}