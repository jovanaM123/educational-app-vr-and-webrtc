import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatematikaComponent } from './matematika.component';

describe('MatematikaComponent', () => {
  let component: MatematikaComponent;
  let fixture: ComponentFixture<MatematikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatematikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatematikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
