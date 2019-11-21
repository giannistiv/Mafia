import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePhaseComponent } from './mobile-phase.component';

describe('MobilePhaseComponent', () => {
  let component: MobilePhaseComponent;
  let fixture: ComponentFixture<MobilePhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilePhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilePhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
