import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileInformationComponent } from "./profile-information/profile-information.component";
import { NavigationButtonsComponent } from "./navigation-buttons/navigation-buttons.component";
import { SocialLink } from '../../shared/interface/IAgnibhaProfile.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ProfileInformationComponent, NavigationButtonsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input()
  activeSection: string = 'indexSection';
  @Input()
  socialLinks?: SocialLink[] = [];
  @Input()
  pfp?: string

  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  closeSidebar(close: boolean): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }

}
