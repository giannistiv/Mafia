import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendTesterComponent } from './backend-tester.component';

describe('BackendTesterComponent', () => {
  let component: BackendTesterComponent;
  let fixture: ComponentFixture<BackendTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
