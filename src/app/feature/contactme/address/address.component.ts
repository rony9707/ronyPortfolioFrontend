import { Component, inject, input } from '@angular/core';
import { IAgnibhaProfile } from '../../../shared/interface/IAgnibhaProfile.interface';
import { IntersectionObserverDirective } from '../../../shared/directive/intersection-observer.directive';
import { CommonService } from '../../../shared/services/common/common.service';


@Component({
  selector: 'app-address',
  standalone: true,
  imports: [IntersectionObserverDirective],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  //Decleare Properties here
  agnibhaData = input<IAgnibhaProfile | null>(null)
  

  public commonService=inject(CommonService)
}
