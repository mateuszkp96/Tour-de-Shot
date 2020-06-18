import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModifyModalComponent } from './product-modify-modal.component';

describe('ProductModifyModalComponent', () => {
  let component: ProductModifyModalComponent;
  let fixture: ComponentFixture<ProductModifyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductModifyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
