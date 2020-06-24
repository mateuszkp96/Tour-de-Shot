import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourLocalsListComponent } from './your-locals-list.component';

describe('YourLocalsListComponent', () => {
  let component: YourLocalsListComponent;
  let fixture: ComponentFixture<YourLocalsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourLocalsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourLocalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
