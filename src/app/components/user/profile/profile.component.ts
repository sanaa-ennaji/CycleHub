import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../models/user.model';
import { AuthState } from '../../../store/auth/auth.state';
import { updateUser } from '../../../store/auth/auth.actions';
import { selectCurrentUser} from '../../../store/auth/auth.selectors';
@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent  implements OnInit{

  profileForm: FormGroup;
  currentUser: User | null = null;

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
          profilePicture: user.profilePicture || '',
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.currentUser) {
      const updatedUser: User = {
        ...this.currentUser,
        ...this.profileForm.value,
        dateOfBirth: new Date(this.profileForm.value.dateOfBirth),
      };
      this.store.dispatch(updateUser({ user: updatedUser }));
    }
  }
}