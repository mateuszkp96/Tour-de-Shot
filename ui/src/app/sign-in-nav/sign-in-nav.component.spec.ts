import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInNavComponent } from './sign-in-nav.component';

describe('SignInNavComponent', () => {
  let component: SignInNavComponent;
  let fixture: ComponentFixture<SignInNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
