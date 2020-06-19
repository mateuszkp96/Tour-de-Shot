import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalInformationsComponent } from './local-informations.component';

describe('LocalInformationsComponent', () => {
  let component: LocalInformationsComponent;
  let fixture: ComponentFixture<LocalInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
