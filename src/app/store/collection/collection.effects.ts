import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { addCollection, updateCollection, deleteCollection } from './collection.actions';
import { tap } from 'rxjs/operators';
import { createEffect } from '@ngrx/effects'; 
@Injectable()
export class CollectionEffects {
  constructor(private actions$: Actions, private store: Store) {}

  saveCollectionToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCollection, updateCollection, deleteCollection),
        tap(() => {
      
          this.store.select('collections').subscribe((state) => {
            localStorage.setItem('collections', JSON.stringify(state.requests));
          });
        })
      ),
    { dispatch: false }
  );
}
