import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloClienteComponent } from './titulo-cliente.component';

describe('TituloClienteComponent', () => {
  let component: TituloClienteComponent;
  let fixture: ComponentFixture<TituloClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TituloClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TituloClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
