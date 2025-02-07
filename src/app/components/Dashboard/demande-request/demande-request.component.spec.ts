import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRequestComponent } from './demande-request.component';

describe('DemandeRequestComponent', () => {
  let component: DemandeRequestComponent;
  let fixture: ComponentFixture<DemandeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
