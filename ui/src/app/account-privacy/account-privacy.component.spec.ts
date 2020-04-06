import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPrivacyComponent } from './account-privacy.component';

describe('AccountPrivacyComponent', () => {
  let component: AccountPrivacyComponent;
  let fixture: ComponentFixture<AccountPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
