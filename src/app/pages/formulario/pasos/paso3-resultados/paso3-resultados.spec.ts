import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso3Resultados } from './paso3-resultados';

describe('Paso3Resultados', () => {
  let component: Paso3Resultados;
  let fixture: ComponentFixture<Paso3Resultados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paso3Resultados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paso3Resultados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
