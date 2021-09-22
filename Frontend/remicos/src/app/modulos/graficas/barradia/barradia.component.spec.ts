import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarradiaComponent } from './barradia.component';

describe('BarradiaComponent', () => {
  let component: BarradiaComponent;
  let fixture: ComponentFixture<BarradiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarradiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarradiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
