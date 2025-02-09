import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionUpdateComponent } from './collection-update.component';

describe('CollectionUpdateComponent', () => {
  let component: CollectionUpdateComponent;
  let fixture: ComponentFixture<CollectionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
