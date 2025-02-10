import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { addCollection, updateCollection, deleteCollection } from './collection.actions';
import { tap } from 'rxjs/operators';
import { selectCollections } from './collection.selector';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class CollectionEffects {
  constructor(private actions$: Actions, private store: Store) {}

  saveCollectionToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCollection, updateCollection, deleteCollection),
        tap(() => {
          this.store.select(selectCollections).subscribe((requests) => {
            localStorage.setItem('collections', JSON.stringify(requests));
          });
        })
      ),
    { dispatch: false }
  );
}
