import { Component, Input,  } from '@angular/core';
import { SectionTitleComponent } from "../../shared/components/section-title/section-title.component";

import { IntersectionObserverDirective } from '../../shared/directive/intersection-observer.directive';
import swal from 'sweetalert2';
import { MetricTemplateComponent } from '../about/metric-template/metric-template.component';
@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [SectionTitleComponent,IntersectionObserverDirective],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.css'
})
export class InterestsComponent {



}
