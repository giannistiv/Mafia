import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WastedComponent } from './wasted.component';

describe('WastedComponent', () => {
  let component: WastedComponent;
  let fixture: ComponentFixture<WastedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WastedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WastedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
