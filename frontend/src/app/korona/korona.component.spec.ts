import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoronaComponent } from './korona.component';

describe('KoronaComponent', () => {
  let component: KoronaComponent;
  let fixture: ComponentFixture<KoronaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoronaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
