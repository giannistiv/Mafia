import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerhistoryComponent } from './playerhistory.component';

describe('PlayerhistoryComponent', () => {
  let component: PlayerhistoryComponent;
  let fixture: ComponentFixture<PlayerhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
