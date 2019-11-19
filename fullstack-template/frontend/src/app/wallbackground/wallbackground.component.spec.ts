import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallbackgroundComponent } from './wallbackground.component';

describe('WallbackgroundComponent', () => {
  let component: WallbackgroundComponent;
  let fixture: ComponentFixture<WallbackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallbackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallbackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
