import { Component, ElementRef, inject, Input, QueryList, SimpleChange, SimpleChanges, ViewChildren } from '@angular/core';
import { SectionTitleComponent } from "../../shared/components/section-title/section-title.component";
import { IAgnibhaProfile } from '../../shared/interface/IAgnibhaProfile.interface';
import { DatePipe } from '@angular/common';
import { CalculateAgePipe } from '../../shared/pipes/calculate-age.pipe';
import { IntersectionObserverDirective } from '../../shared/directive/intersection-observer.directive';
import { MetricTemplateComponent } from './metric-template/metric-template.component';
import { CommonService } from '../../shared/services/common/common.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionTitleComponent, DatePipe, CalculateAgePipe, IntersectionObserverDirective, MetricTemplateComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  //Decleare Properties here
  @Input()
  agnibhaData?: IAgnibhaProfile | null = null;
  website: string = window.location.origin

  //inject services here
  public commonService = inject(CommonService)


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agnibhaData'] && this.agnibhaData?.meterics?.length) {
      const doj = '23/06/2020';

      for (let metric of this.agnibhaData.meterics) {
        if (metric.type === 'itExperience') {
          //Calculate years of Experience here
          metric.count = this.commonService.getYearsOfExperience(doj);
        }
        if (metric.type === 'hoursOfSupport') {
          //Calculate hours of support here
          metric.count = this.commonService.getHoursOfSupport(doj);
        }
      }
    }
  }



}
