import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CemeterypopupComponent } from './cemeterypopup.component';

describe('CemeterypopupComponent', () => {
  let component: CemeterypopupComponent;
  let fixture: ComponentFixture<CemeterypopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CemeterypopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CemeterypopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
