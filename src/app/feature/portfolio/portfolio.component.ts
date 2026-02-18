import { Component, computed, input, signal } from '@angular/core';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { IntersectionObserverDirective } from '../../shared/directive/intersection-observer.directive';
import { PortfolioTemplateComponent } from './portfolio-template/portfolio-template.component';
import { Portfolio } from '../../shared/interface/IAgnibhaProfile.interface';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [SectionTitleComponent, IntersectionObserverDirective, PortfolioTemplateComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  
  // Signal input for portfolios
  readonly portfolios = input<Portfolio[]>([]); // reactive input signal

  // Selected filter type
  selectedType = signal<'All' | string>('All');

  // Get unique types dynamically
  uniqueTypes = computed(() => {
    const types = this.portfolios().map(p => p.type);
    return [...new Set(types)];
  });

  // Filtered portfolios based on selected type
  filteredPortfolios = computed(() => {
    const type = this.selectedType();
    const list = this.portfolios();
    return type === 'All' ? list : list.filter(p => p.type === type);
  });

  // Method to set selected type
  filterPortfolios(type: string) {
    this.selectedType.set(type);
  }
}
