import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RohikaUsersComponent } from './rohika-users.component';

describe('RohikaUsersComponent', () => {
  let component: RohikaUsersComponent;
  let fixture: ComponentFixture<RohikaUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RohikaUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RohikaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
