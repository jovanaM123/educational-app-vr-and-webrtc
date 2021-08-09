import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobaComponent } from './soba.component';

describe('SobaComponent', () => {
  let component: SobaComponent;
  let fixture: ComponentFixture<SobaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
