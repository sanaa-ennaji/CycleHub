import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Collection } from '../../../models/Collection.model';
import { CommonModule } from '@angular/common';
import { Status } from '../../../models/Status.enum';

@Component({
  selector: 'app-demande-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './demande-request.component.html',
  styleUrls: ['./demande-request.component.css']
})
export class DemandeRequestComponent {
  requestForm: FormGroup;
  isOpen: boolean = false;
  userId: string = ''; 
  photos: string[] = [];

  constructor(private fb: FormBuilder, private store: Store) {
    this.requestForm = this.fb.group({
      wasteType: ['', Validators.required],
      estimatedWeight: ['', [Validators.required, Validators.min(1000)]],
      Address: ['', Validators.required],
      Date: ['', Validators.required],
      TimeSlot: ['', Validators.required],
      additionalNotes: ['']
    });
    this.getUserId();
  }

  private getUserId() {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userId = user?.id || ''; 
  }
  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.resetForm();
  }
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photos.push(e.target.result); 
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const request: Collection = {
        ...this.requestForm.value,
        id: this.generateId(),
        userId: this.userId, 
        photos: this.photos,
        status: Status.PENDING
      };
      this.saveToLocalStorage(request);
      this.closeModal();
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

  private saveToLocalStorage(collection: Collection) {
    const collections = JSON.parse(localStorage.getItem('collections') || '[]'); 
    collections.push(collection);
    localStorage.setItem('collections', JSON.stringify(collections));
  }
  
}