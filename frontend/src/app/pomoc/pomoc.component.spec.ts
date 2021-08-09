import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomocComponent } from './pomoc.component';

describe('PomocComponent', () => {
  let component: PomocComponent;
  let fixture: ComponentFixture<PomocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PomocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PomocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
