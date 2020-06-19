import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLocalDeleteModalComponent } from './confirm-local-delete-modal.component';

describe('ConfirmLocalDeleteModalComponent', () => {
  let component: ConfirmLocalDeleteModalComponent;
  let fixture: ComponentFixture<ConfirmLocalDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmLocalDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmLocalDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
