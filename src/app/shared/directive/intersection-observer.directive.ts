import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]',
  standalone: true
})
export class IntersectionObserverDirective {

    constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'show');
          observer.unobserve(this.el.nativeElement); // remove if only once
        }
      },
      { threshold: 0.1 } // adjust for sensitivity
    );

    observer.observe(this.el.nativeElement);
  }

}
