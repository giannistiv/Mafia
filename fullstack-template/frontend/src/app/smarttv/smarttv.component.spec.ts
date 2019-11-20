import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SmarttvComponent } from './smarttv.component';

describe('SmarttvComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SmarttvComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SmarttvComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'smarttv'`, () => {
    const fixture = TestBed.createComponent(SmarttvComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('smarttv');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SmarttvComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('smarttv app is running!');
  });
});
