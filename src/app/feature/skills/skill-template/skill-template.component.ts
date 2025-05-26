import { ChangeDetectorRef, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Skill } from '../../../shared/interface/IAgnibhaProfile.interface';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { IntersectionObserverDirective } from '../../../shared/directive/intersection-observer.directive';


@Component({
  selector: 'app-skill-template',
  standalone: true,
  imports: [IntersectionObserverDirective],
  templateUrl: './skill-template.component.html',
  styleUrl: './skill-template.component.css',
  animations: [
    trigger('progressAnimation', [
      state('start', style({
        width: '0%'
      })),
      state('end', style({
        width: '{{ widthValue }}%'
      }), { params: { widthValue: 0 } }),
      transition('start => end', animate('1s'))
    ])
  ]
})
export class SkillTemplateComponent {

  @ViewChild('templatePercentage', { static: false }) templatePercentage!: ElementRef;


  percentage: number = 0;
  animationState: string = 'start';
  widthValue: number = 0;

  @ViewChild('skillTemplate', { static: false }) skillTemplate!: ElementRef;

  private cdRef = inject(ChangeDetectorRef)


  @Input() skill?: Skill;

  ngAfterViewInit(): void {
    this.percentage = parseFloat(this.templatePercentage.nativeElement.textContent.replace('%', ''));
    // Set dynamic width value
    this.setWidthValue();

    // Create an IntersectionObserver
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger animation
          setTimeout(() => {
            this.animationState = 'end';
          }, 100);

          observer.disconnect(); // Stop observing once the div is visible
        }
      });
    });

    // Observe the target div
    observer.observe(this.skillTemplate.nativeElement);
  }


  // set the width of the progress bar to the percentage
  private setWidthValue(): void {
    this.widthValue = this.percentage;
    this.cdRef.detectChanges(); // Manually trigger change detection
  }

}
