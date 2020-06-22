import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHeaderAddModalComponent } from './category-header-add-modal.component';

describe('CategoryHeaderAddModalComponent', () => {
  let component: CategoryHeaderAddModalComponent;
  let fixture: ComponentFixture<CategoryHeaderAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryHeaderAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryHeaderAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
