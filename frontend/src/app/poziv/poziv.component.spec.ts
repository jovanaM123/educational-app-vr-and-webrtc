import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PozivComponent } from './poziv.component';

describe('PozivComponent', () => {
  let component: PozivComponent;
  let fixture: ComponentFixture<PozivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PozivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PozivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
