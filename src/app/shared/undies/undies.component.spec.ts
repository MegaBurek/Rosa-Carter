import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndiesComponent } from './undies.component';

describe('UndiesComponent', () => {
  let component: UndiesComponent;
  let fixture: ComponentFixture<UndiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
