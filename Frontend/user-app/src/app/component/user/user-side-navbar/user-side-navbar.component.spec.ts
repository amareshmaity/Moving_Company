import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSideNavbarComponent } from './user-side-navbar.component';

describe('UserSideNavbarComponent', () => {
  let component: UserSideNavbarComponent;
  let fixture: ComponentFixture<UserSideNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSideNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
