import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeometrijaComponent } from './geometrija.component';

describe('GeometrijaComponent', () => {
  let component: GeometrijaComponent;
  let fixture: ComponentFixture<GeometrijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeometrijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeometrijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
