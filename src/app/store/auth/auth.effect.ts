import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { registerUser } from './auth.actions';
import { tap } from 'rxjs/operators';
import { StorageService } from '../../services/storage.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private storageService: StorageService) {}

  saveUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerUser),
        tap(({ user }) => {
          this.storageService.setItem('user', JSON.stringify(user)); 
        })
      ),
    { dispatch: false } 
  );
}