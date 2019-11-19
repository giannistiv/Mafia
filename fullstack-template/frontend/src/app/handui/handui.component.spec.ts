import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HanduiComponent } from './handui.component';

describe('HanduiComponent', () => {
  let component: HanduiComponent;
  let fixture: ComponentFixture<HanduiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HanduiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HanduiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
