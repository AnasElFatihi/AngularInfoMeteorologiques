import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapteursrespComponent } from './capteursresp.component';

describe('CapteursrespComponent', () => {
  let component: CapteursrespComponent;
  let fixture: ComponentFixture<CapteursrespComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapteursrespComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapteursrespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
