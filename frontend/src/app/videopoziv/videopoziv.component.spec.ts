import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideopozivComponent } from './videopoziv.component';

describe('VideopozivComponent', () => {
  let component: VideopozivComponent;
  let fixture: ComponentFixture<VideopozivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideopozivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideopozivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
