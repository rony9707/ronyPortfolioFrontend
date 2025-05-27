import { Component } from '@angular/core';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { IntersectionObserverDirective } from '../../shared/directive/intersection-observer.directive';
import { CommonModule } from '@angular/common';
import { PortfolioTemplateComponent } from './portfolio-template/portfolio-template.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [SectionTitleComponent, IntersectionObserverDirective, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {

}
