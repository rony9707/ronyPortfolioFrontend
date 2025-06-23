import { Component, input, Input } from '@angular/core';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ResumeSummaryComponent } from './resume-summary/resume-summary.component';
import { ResumeEducationComponent } from './resume-education/resume-education.component';
import { ResumeProExperienceComponent } from './resume-pro-experience/resume-pro-experience.component';
import { IntersectionObserverDirective } from '../../shared/directive/intersection-observer.directive';
import { Experience, IAgnibhaProfile } from '../../shared/interface/IAgnibhaProfile.interface';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    SectionTitleComponent,
    ResumeSummaryComponent,
    ResumeEducationComponent,
    ResumeProExperienceComponent,
    IntersectionObserverDirective],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {

  //Decleare Properties here
  agnibhaData = input<IAgnibhaProfile | null>(null)
  @Input()
  experience?: Experience[] = [];
  @Input()
  resumeDownloadLink?: string


}
