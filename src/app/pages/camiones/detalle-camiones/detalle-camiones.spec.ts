import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCamiones } from './detalle-camiones';

describe('DetalleCamiones', () => {
  let component: DetalleCamiones;
  let fixture: ComponentFixture<DetalleCamiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCamiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCamiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
