import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAccessoiresComponent } from './liste-accessoires.component';

describe('ListeAccessoiresComponent', () => {
  let component: ListeAccessoiresComponent;
  let fixture: ComponentFixture<ListeAccessoiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeAccessoiresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeAccessoiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
