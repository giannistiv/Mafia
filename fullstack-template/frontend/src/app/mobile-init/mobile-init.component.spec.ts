import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInitComponent } from './mobile-init.component';

describe('MobileInitComponent', () => {
  let component: MobileInitComponent;
  let fixture: ComponentFixture<MobileInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
