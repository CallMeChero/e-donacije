import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMapDetailComponent } from './modal-map-detail.component';

describe('ModalMapDetailComponent', () => {
  let component: ModalMapDetailComponent;
  let fixture: ComponentFixture<ModalMapDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMapDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMapDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
