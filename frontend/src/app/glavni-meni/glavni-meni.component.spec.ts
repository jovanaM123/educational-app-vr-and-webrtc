import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlavniMeniComponent } from './glavni-meni.component';

describe('GlavniMeniComponent', () => {
  let component: GlavniMeniComponent;
  let fixture: ComponentFixture<GlavniMeniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlavniMeniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlavniMeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
