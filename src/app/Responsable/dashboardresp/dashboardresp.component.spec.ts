import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardrespComponent } from './dashboardresp.component';

describe('DashboardrespComponent', () => {
  let component: DashboardrespComponent;
  let fixture: ComponentFixture<DashboardrespComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardrespComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardrespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
