import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaciComponent } from './domaci.component';

describe('DomaciComponent', () => {
  let component: DomaciComponent;
  let fixture: ComponentFixture<DomaciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomaciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
