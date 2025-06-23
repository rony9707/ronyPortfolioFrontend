import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntersectionObserverDirective } from './intersection-observer.directive';

@Component({
  template: `<div appIntersectionObserver></div>`,
  standalone: true,
  imports: [IntersectionObserverDirective]
})
class TestComponent {}

describe('IntersectionObserverDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directiveEl = fixture.nativeElement.querySelector('[appIntersectionObserver]');
    expect(directiveEl).toBeTruthy();
  });
});
