import { Component, inject, input } from '@angular/core';
import { IAgnibhaProfile } from '../../../shared/interface/IAgnibhaProfile.interface';
import { IntersectionObserverDirective } from '../../../shared/directive/intersection-observer.directive';
import { CommonService } from '../../../shared/services/common/common.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [IntersectionObserverDirective],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent {
  //Decleare Properties here
  agnibhaData = input<IAgnibhaProfile | null>(null);

  private sanitizer = inject(DomSanitizer);

  mapUrl: SafeResourceUrl;

  constructor() {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5207.763595006617!2d88.40834558149784!3d22.637181741311156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e6d45b4617d%3A0xeaaa11462b70357b!2sDum%20Dum%20Cantonment!5e0!3m2!1sen!2sin!4v1748711985791!5m2!1sen!2sin&z=25',
    );
  }
  public commonService = inject(CommonService);
}
