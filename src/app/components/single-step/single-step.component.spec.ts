import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleStepComponent } from './single-step.component';

describe('SingleStepComponent', () => {
  let component: SingleStepComponent;
  let fixture: ComponentFixture<SingleStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
