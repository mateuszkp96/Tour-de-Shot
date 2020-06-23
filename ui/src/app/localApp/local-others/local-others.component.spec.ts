import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalOthersComponent } from './local-others.component';

describe('LocalOthersComponent', () => {
  let component: LocalOthersComponent;
  let fixture: ComponentFixture<LocalOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
