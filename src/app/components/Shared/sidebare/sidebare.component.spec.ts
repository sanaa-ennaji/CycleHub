import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebareComponent } from './sidebare.component';

describe('SidebareComponent', () => {
  let component: SidebareComponent;
  let fixture: ComponentFixture<SidebareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
