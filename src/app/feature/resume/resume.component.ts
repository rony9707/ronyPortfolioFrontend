import { Component } from '@angular/core';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ResumeSummaryComponent } from './resume-summary/resume-summary.component';
import { ResumeEducationComponent } from './resume-education/resume-education.component';
import { ResumeProExperienceComponent } from './resume-pro-experience/resume-pro-experience.component';
import { DownloadResumeComponent } from './download-resume/download-resume.component';
import { IntersectionObserverDirective } from '../../shared/directive/intersection-observer.directive';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    SectionTitleComponent,
    ResumeSummaryComponent,
    ResumeEducationComponent,
    ResumeProExperienceComponent,
    DownloadResumeComponent,
    IntersectionObserverDirective],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {

}
