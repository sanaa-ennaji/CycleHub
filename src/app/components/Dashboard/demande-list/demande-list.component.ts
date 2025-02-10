import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeRequestComponent } from '../demande-request/demande-request.component';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CollectionState } from '../../../store/collection/collection.reducer';
import { Collection } from '../../../models/Collection.model';
@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [CommonModule, DemandeRequestComponent, NavbarComponent],
  templateUrl: './demande-list.component.html',
  styleUrl: './demande-list.component.css'
})
export class DemandeListComponent {
  collections$: Observable<Collection[]>;

  constructor(private store: Store<{ collections: CollectionState }>) {
    this.collections$ = this.store.pipe(select(state => state.collections.requests));
  }
}
