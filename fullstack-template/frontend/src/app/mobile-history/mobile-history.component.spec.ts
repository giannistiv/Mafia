import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileHistoryComponent } from './mobile-history.component';

describe('MobileHistoryComponent', () => {
  let component: MobileHistoryComponent;
  let fixture: ComponentFixture<MobileHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
