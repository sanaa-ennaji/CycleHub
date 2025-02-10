import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { addCollection, updateCollection, deleteCollection } from './collection.actions';
import { tap } from 'rxjs/operators';
import { createEffect } from '@ngrx/effects'; 
import { selectCollections } from './collection.selector';

@Injectable()
export class CollectionEffects {
  constructor(private actions$: Actions, private store: Store) {}

  saveCollectionToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCollection, updateCollection, deleteCollection),
        tap((action) => {
          console.log('addCollection action received:', action);  
          this.store
            .select(selectCollections)
            .subscribe((requests) => {
              console.log('Saving collections to localStorage:', requests); 
              localStorage.setItem('collections', JSON.stringify(requests));
            });
        })
      ),
    { dispatch: false }
  );
}
