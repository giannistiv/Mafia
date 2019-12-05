import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBioComponent } from './mobile-bio.component';

describe('MobileBioComponent', () => {
  let component: MobileBioComponent;
  let fixture: ComponentFixture<MobileBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
