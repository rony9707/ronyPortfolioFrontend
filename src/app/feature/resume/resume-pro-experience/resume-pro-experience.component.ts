import { animate, state, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { Experience } from '../../../shared/interface/IAgnibhaProfile.interface'
import { DownloadResumeComponent } from '../download-resume/download-resume.component'
import { IntersectionObserverDirective } from '../../../shared/directive/intersection-observer.directive'
import { ExperienceTimelineComponentComponent } from './experience-timeline-component/experience-timeline-component.component'

@Component({
  selector: 'app-resume-pro-experience',
  standalone: true,
  imports: [
    CommonModule,
    DownloadResumeComponent,
    IntersectionObserverDirective,
    ExperienceTimelineComponentComponent
  ],
  templateUrl: './resume-pro-experience.component.html',
  styleUrl: './resume-pro-experience.component.css',
  animations: [
    trigger('slideToggle', [
      state(
        'closed',
        style({
          height: '0px',
          overflow: 'hidden',
          padding: '0 10px'
        })
      ),
      state(
        'open',
        style({
          height: '*',
          overflow: 'hidden',
          padding: '10px'
        })
      ),
      transition('closed <=> open', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ])
  ]
})
export class ResumeProExperienceComponent implements OnInit {
  @Input()
  experiences: Experience[] = []
  @Input()
  resumeDownloadLink?: string

  openIndex: number | null = null
  activeCompany: string | null = null
  hoveredIndex: number | null = null

  ngOnInit (): void {
    if (this.experiences?.length) {
      // open last item by default
      this.openIndex = this.experiences.length - 1
      this.updateActiveCompany()
    }
  }

  toggle (index: number) {
    if (this.openIndex === index) {
      // fallback to last company instead of null
      this.openIndex = this.experiences.length - 1
    } else {
      this.openIndex = index
    }

    this.updateActiveCompany()
  }

  updateActiveCompany () {
    if (this.hoveredIndex !== null) {
      this.activeCompany = this.experiences[this.hoveredIndex]?.company ?? null
      return
    }

    if (this.openIndex !== null) {
      this.activeCompany = this.experiences[this.openIndex]?.company ?? null
      return
    }

    this.activeCompany = null
  }

  isOpen (index: number): boolean {
    return this.openIndex === index
  }
}
