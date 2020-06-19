import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAddModalComponent } from './menu-add-modal.component';

describe('MenuAddModalComponent', () => {
  let component: MenuAddModalComponent;
  let fixture: ComponentFixture<MenuAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
