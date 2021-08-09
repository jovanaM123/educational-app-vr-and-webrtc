import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NjujorkComponent } from './njujork.component';

describe('NjujorkComponent', () => {
  let component: NjujorkComponent;
  let fixture: ComponentFixture<NjujorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NjujorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NjujorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
