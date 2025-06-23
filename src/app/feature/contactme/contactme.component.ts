import { Component, input } from '@angular/core';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { IntersectionObserverDirective } from '../../shared/directive/intersection-observer.directive';
import { AddressComponent } from "./address/address.component";
import { IAgnibhaProfile } from '../../shared/interface/IAgnibhaProfile.interface';
import { ContactMeFormComponent } from "./contact-me-form/contact-me-form.component";

@Component({
  selector: 'app-contactme',
  standalone: true,
  imports: [SectionTitleComponent, IntersectionObserverDirective, AddressComponent, ContactMeFormComponent],
  templateUrl: './contactme.component.html',
  styleUrl: './contactme.component.css'
})
export class ContactmeComponent {
  //Decleare Properties here
  agnibhaData = input<IAgnibhaProfile | null>(null)
}
