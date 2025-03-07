import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YangValidatorComponent } from './yang-validator.component';

describe('YangValidatorComponent', () => {
  let component: YangValidatorComponent;
  let fixture: ComponentFixture<YangValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YangValidatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YangValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
