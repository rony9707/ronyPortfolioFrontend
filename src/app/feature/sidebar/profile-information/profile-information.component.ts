import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SocialLinksComponent } from "./social-links/social-links.component";
import { SocialLink } from '../../../shared/interface/IAgnibhaProfile.interface';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [CommonModule, SocialLinksComponent],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css'
})
export class ProfileInformationComponent {
  @Input()
  socialLinks?: SocialLink[] = [];

  @Input()
  pfp?: string
}
