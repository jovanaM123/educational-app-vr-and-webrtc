import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredavanjaComponent } from './predavanja.component';

describe('PredavanjaComponent', () => {
  let component: PredavanjaComponent;
  let fixture: ComponentFixture<PredavanjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredavanjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredavanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
