import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ronyPortfolio' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ronyPortfolio');
  });

  it('should render router-outlet and optionally loader', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Check that <router-outlet> exists
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should show loader when showloader() returns true', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const component = fixture.componentInstance;

  spyOn(component, 'showloader').and.returnValue(true);
  fixture.detectChanges();

  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.querySelector('.loader-wrapper')).toBeTruthy();
  expect(compiled.querySelector('.loader')).toBeTruthy();
});


});
