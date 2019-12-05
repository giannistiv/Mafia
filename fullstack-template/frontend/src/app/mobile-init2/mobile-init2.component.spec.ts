import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInit2Component } from './mobile-init2.component';

describe('MobileInit2Component', () => {
  let component: MobileInit2Component;
  let fixture: ComponentFixture<MobileInit2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileInit2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileInit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
