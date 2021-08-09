import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KurseviComponent } from './kursevi.component';

describe('KurseviComponent', () => {
  let component: KurseviComponent;
  let fixture: ComponentFixture<KurseviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KurseviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KurseviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
