import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqForServiceComponent } from './req-for-service.component';

describe('ReqForServiceComponent', () => {
  let component: ReqForServiceComponent;
  let fixture: ComponentFixture<ReqForServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqForServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqForServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
