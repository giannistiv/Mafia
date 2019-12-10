import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAbilityComponent } from './mobile-ability.component';

describe('MobileAbilityComponent', () => {
  let component: MobileAbilityComponent;
  let fixture: ComponentFixture<MobileAbilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAbilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
