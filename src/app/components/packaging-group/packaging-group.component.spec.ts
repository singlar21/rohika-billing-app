import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingGroupComponent } from './packaging-group.component';

describe('PackagingGroupComponent', () => {
  let component: PackagingGroupComponent;
  let fixture: ComponentFixture<PackagingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
