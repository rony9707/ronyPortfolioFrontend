import { Component, inject, Input } from '@angular/core';
import { CommonService } from '../../../shared/services/common/common.service';
import { IAgnibhaProfile } from '../../../shared/interface/IAgnibhaProfile.interface';
import { IntersectionObserverDirective } from '../../../shared/directive/intersection-observer.directive';

@Component({
  selector: 'app-resume-summary',
  standalone: true,
  imports: [IntersectionObserverDirective],
  templateUrl: './resume-summary.component.html',
  styleUrl: './resume-summary.component.css'
})
export class ResumeSummaryComponent {


  //Decleare Properties here
  @Input()
  agnibhaData?: IAgnibhaProfile | null = null;

  //Inject services here
  private commonService = inject(CommonService)


  aboutMe = `
  Innovative and deadline-driven Software Developer with ${Math.floor(this.commonService.getYearsOfExperience('23/06/2020') * 10) / 10} years of experience in 
  creating efficient and innovative software solutions and front end development.
`;



}
