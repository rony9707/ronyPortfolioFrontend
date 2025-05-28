import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Experience } from '../../../shared/interface/IAgnibhaProfile.interface';
import { DownloadResumeComponent } from "../download-resume/download-resume.component";
import { IntersectionObserverDirective } from '../../../shared/directive/intersection-observer.directive';

@Component({
  selector: 'app-resume-pro-experience',
  standalone: true,
  imports: [CommonModule, DownloadResumeComponent,IntersectionObserverDirective],
  templateUrl: './resume-pro-experience.component.html',
  styleUrl: './resume-pro-experience.component.css',
  animations: [
    trigger('slideToggle', [
      state('closed', style({
        height: '0px',
        overflow: 'hidden',
        padding: '0 10px',
      })),
      state('open', style({
        height: '*',
        overflow: 'hidden',
        padding: '10px',
      })),
      transition('closed <=> open', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
    ])
  ]
})
export class ResumeProExperienceComponent {


  @Input()
  experiences?: Experience[] = [];
  @Input()
  resumeDownloadLink?: string

  openIndex: number | null = null;

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

  isOpen(index: number): boolean {
    return this.openIndex === index;
  }
}
