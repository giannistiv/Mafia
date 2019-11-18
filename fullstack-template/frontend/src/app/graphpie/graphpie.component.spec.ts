import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphpieComponent } from './graphpie.component';

describe('GraphpieComponent', () => {
  let component: GraphpieComponent;
  let fixture: ComponentFixture<GraphpieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphpieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphpieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
