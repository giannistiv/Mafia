import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivevotingHeaderComponent } from './livevoting-header.component';

describe('LivevotingHeaderComponent', () => {
  let component: LivevotingHeaderComponent;
  let fixture: ComponentFixture<LivevotingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivevotingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivevotingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
