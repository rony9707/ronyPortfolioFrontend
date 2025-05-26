import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SectionScrollService } from '../../../core/services/sectionScroll/section-scroll.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-buttons.component.html',
  styleUrl: './navigation-buttons.component.css'
})
export class NavigationButtonsComponent {

  @Input() activeSection!: string;
  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  sections = [
    { id: 'indexSection', label: 'Index', icon: 'bi-house' },
    { id: 'aboutSection', label: 'About', icon: 'bi-person' },
    { id: 'resumeSection', label: 'Resume', icon: 'bi-file-earmark-text' },
    { id: 'portfolioSection', label: 'Portfolio', icon: 'bi-images' },
    { id: 'contactSection', label: 'Contact', icon: 'bi-envelope' }
  ];


  private scrollService = inject(SectionScrollService)

  navigate(section: string) {
    this.scrollService.scrollToSection(section);
  }

  closeSidebar(): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }
}
