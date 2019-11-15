import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteBoxComponent } from './vote-box.component';

describe('VoteBoxComponent', () => {
  let component: VoteBoxComponent;
  let fixture: ComponentFixture<VoteBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
