import { Component, Input } from '@angular/core';
import { Portfolio } from '../../../shared/interface/IAgnibhaProfile.interface';
import { IntersectionObserverDirective } from '../../../shared/directive/intersection-observer.directive';

@Component({
  selector: 'app-portfolio-template',
  standalone: true,
  imports: [IntersectionObserverDirective],
  templateUrl: './portfolio-template.component.html',
  styleUrl: './portfolio-template.component.css'
})
export class PortfolioTemplateComponent {
  @Input() MyPortfolio?: Portfolio;
}
