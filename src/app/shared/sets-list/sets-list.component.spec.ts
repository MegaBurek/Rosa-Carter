import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsListComponent } from './sets-list.component';

describe('SetsListComponent', () => {
  let component: SetsListComponent;
  let fixture: ComponentFixture<SetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
