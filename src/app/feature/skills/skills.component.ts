import { ChangeDetectionStrategy, Component, ElementRef, input, Input, QueryList, signal, SimpleChange, SimpleChanges, ViewChildren } from '@angular/core';
import { SectionTitleComponent } from "../../shared/components/section-title/section-title.component";
import { IAgnibhaProfile, Skill } from '../../shared/interface/IAgnibhaProfile.interface';
import { DatePipe } from '@angular/common';
import { CalculateAgePipe } from '../../shared/pipes/calculate-age.pipe';
import { IntersectionObserverDirective } from '../../shared/directive/intersection-observer.directive';
import swal from 'sweetalert2';
import { MetricTemplateComponent } from '../about/metric-template/metric-template.component';
import { SkillTemplateComponent } from './skill-template/skill-template.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionTitleComponent,IntersectionObserverDirective,SkillTemplateComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {

  skills = input<Skill[]>([])

  

}
