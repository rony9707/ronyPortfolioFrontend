import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionTitleComponent } from "../../shared/components/section-title/section-title.component";
import { Skill } from '../../shared/interface/IAgnibhaProfile.interface';
import { IntersectionObserverDirective } from '../../shared/directive/intersection-observer.directive';
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
