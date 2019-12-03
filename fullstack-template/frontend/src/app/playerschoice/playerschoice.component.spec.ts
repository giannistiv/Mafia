import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerschoiceComponent } from './playerschoice.component';

describe('PlayerschoiceComponent', () => {
  let component: PlayerschoiceComponent;
  let fixture: ComponentFixture<PlayerschoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerschoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerschoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
