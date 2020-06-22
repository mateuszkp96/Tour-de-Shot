import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHeaderModifyModalComponent } from './category-header-modify-modal.component';

describe('CategoryHeaderModifyModalComponent', () => {
  let component: CategoryHeaderModifyModalComponent;
  let fixture: ComponentFixture<CategoryHeaderModifyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryHeaderModifyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryHeaderModifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
