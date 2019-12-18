import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallInitComponent } from './wall-init.component';

describe('WallInitComponent', () => {
  let component: WallInitComponent;
  let fixture: ComponentFixture<WallInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
