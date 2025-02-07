import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-demande-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './demande-request.component.html',
  styleUrl: './demande-request.component.css'
})
export class DemandeRequestComponent {
  requestForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.requestForm = this.fb.group({
      wasteType: ['', Validators.required],
      photos: [[]],
      estimatedWeight: ['', [Validators.required, Validators.min(1000)]],
      Address: ['', Validators.required],
      Date: ['', Validators.required],
      TimeSlot: ['', Validators.required],
      additionalNotes: [''],
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const request = {
        ...this.requestForm.value,
        status: 'en attente',
      };
      console.log('Request submitted:', request);
     
    }
  }
}