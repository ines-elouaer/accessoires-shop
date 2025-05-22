import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAccessoireComponent } from './ajout-accessoire.component';

describe('AjoutAccessoireComponent', () => {
  let component: AjoutAccessoireComponent;
  let fixture: ComponentFixture<AjoutAccessoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutAccessoireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutAccessoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
