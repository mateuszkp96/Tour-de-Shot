import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalSideNavComponent } from './local-side-nav.component';

describe('LocalSideNavComponent', () => {
  let component: LocalSideNavComponent;
  let fixture: ComponentFixture<LocalSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
