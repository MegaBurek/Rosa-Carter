import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BraListComponent } from './bra-list.component';

describe('BraListComponent', () => {
  let component: BraListComponent;
  let fixture: ComponentFixture<BraListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BraListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
