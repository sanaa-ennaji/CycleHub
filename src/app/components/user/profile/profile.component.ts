import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../models/user.model';
import { AuthState } from '../../../store/auth/auth.state';
import { updateUser } from '../../../store/auth/auth.actions';
import { selectCurrentUser} from '../../../store/auth/auth.selectors';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule,  CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;
  selectedFile: File | null = null;
  previewImage: string | null = null;

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {
    this.profileForm = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      address: [''],
      phoneNumber: [''],
      dateOfBirth: [''],
      profilePicture: [''],
    });
  }

  ngOnInit(): void {
    this.store.select(selectCurrentUser).subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.profileForm.patchValue({
          email: user.email,
          firstName: user.firstName,
          address: user.address,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        });
        this.previewImage = user.profilePicture || null;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.currentUser) {
      const updatedUser: User = {
        ...this.currentUser,
        ...this.profileForm.value,
        dateOfBirth: new Date(this.profileForm.value.dateOfBirth),
        profilePicture: this.previewImage || this.currentUser.profilePicture, 
      };

      this.store.dispatch(updateUser({ user: updatedUser }));
    }
  }
}
