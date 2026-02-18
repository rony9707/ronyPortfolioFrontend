import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SocialLinksComponent } from './social-links/social-links.component';
import { SocialLink } from '../../../shared/interface/IAgnibhaProfile.interface';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [SocialLinksComponent],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInformationComponent {
  socialLinks = input<SocialLink[]>([]);
  pfp = input<string>('');
}
