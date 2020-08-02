import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndiesListComponent } from './undies-list.component';

describe('UndiesListComponent', () => {
  let component: UndiesListComponent;
  let fixture: ComponentFixture<UndiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
