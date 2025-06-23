import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { ProfileInformationComponent } from "./profile-information/profile-information.component";
import { NavigationButtonsComponent } from "./navigation-buttons/navigation-buttons.component";
import { SocialLink } from '../../shared/interface/IAgnibhaProfile.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ProfileInformationComponent, NavigationButtonsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  activeSection = input<string>('indexSection');

  socialLinks = input<SocialLink[]>([]);

  pfp = input<string>('')

  @Output() closeSidebarEvent = new EventEmitter<boolean>();

  closeSidebar(close: boolean): void {
    this.closeSidebarEvent.emit(false); // Emit the event to close the sidebar
  }

}
