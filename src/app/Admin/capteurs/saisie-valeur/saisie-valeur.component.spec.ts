import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieValeurComponent } from './saisie-valeur.component';

describe('SaisieValeurComponent', () => {
  let component: SaisieValeurComponent;
  let fixture: ComponentFixture<SaisieValeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisieValeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisieValeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
