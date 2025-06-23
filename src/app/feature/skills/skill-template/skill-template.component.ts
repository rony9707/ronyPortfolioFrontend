import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, input, Input, signal, ViewChild } from '@angular/core';
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
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SkillTemplateComponent {

  @ViewChild('templatePercentage', { static: false }) templatePercentage!: ElementRef;
  @ViewChild('skillTemplate', { static: false }) skillTemplate!: ElementRef;

  skill = input<Skill>();

  // Convert to signals
  percentage = signal<number>(0);
  animationState = signal<'start' | 'end'>('start');
  widthValue = signal<number>(0);

  private cdRef = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    const percentText = this.templatePercentage.nativeElement.textContent.replace('%', '');
    this.percentage.set(parseFloat(percentText));
    this.setWidthValue();

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.animationState.set('end');
          }, 100);
          observer.disconnect();
        }
      });
    });

    observer.observe(this.skillTemplate.nativeElement);
  }

  private setWidthValue(): void {
    this.widthValue.set(this.percentage());
    this.cdRef.detectChanges();
  }
}
