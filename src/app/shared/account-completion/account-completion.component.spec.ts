import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCompletionComponent } from './account-completion.component';

describe('AccountCompletionComponent', () => {
  let component: AccountCompletionComponent;
  let fixture: ComponentFixture<AccountCompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
