import { Component } from '@angular/core';
import { IntersectionObserverDirective } from '../../../shared/directive/intersection-observer.directive';

@Component({
  selector: 'app-resume-education',
  standalone: true,
  imports: [IntersectionObserverDirective],
  templateUrl: './resume-education.component.html',
  styleUrl: './resume-education.component.css'
})
export class ResumeEducationComponent {

}
