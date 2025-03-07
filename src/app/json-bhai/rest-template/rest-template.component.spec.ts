import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestTemplateComponent } from './rest-template.component';

describe('RestTemplateComponent', () => {
  let component: RestTemplateComponent;
  let fixture: ComponentFixture<RestTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
