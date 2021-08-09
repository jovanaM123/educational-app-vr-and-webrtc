import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosaljiComponent } from './posalji.component';

describe('PosaljiComponent', () => {
  let component: PosaljiComponent;
  let fixture: ComponentFixture<PosaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosaljiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
