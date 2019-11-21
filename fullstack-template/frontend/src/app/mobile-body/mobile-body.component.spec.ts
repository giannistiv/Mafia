import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBodyComponent } from './mobile-body.component';

describe('MobileBodyComponent', () => {
  let component: MobileBodyComponent;
  let fixture: ComponentFixture<MobileBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
