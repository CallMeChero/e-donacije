import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardNavBarComponent } from './wizard-nav-bar.component';

describe('WizardNavBarComponent', () => {
  let component: WizardNavBarComponent;
  let fixture: ComponentFixture<WizardNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
