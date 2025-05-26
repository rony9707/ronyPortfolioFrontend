import { Component, Input } from '@angular/core';
import { SocialLink } from '../../../../shared/interface/IAgnibhaProfile.interface';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.css'
})
export class SocialLinksComponent {

  @Input()
  socialLinks?: SocialLink[] = [];

}
