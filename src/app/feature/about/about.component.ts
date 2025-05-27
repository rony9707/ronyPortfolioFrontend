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
          metric.count = this.getYearsOfExperience(doj);
        }
        if (metric.type === 'hoursOfSupport') {
          //Calculate hours of support here
          metric.count = this.getHoursOfSupport(doj);
        }
      }
    }
  }

  getYearsOfExperience(doj: string): number {
    const [day, month, year] = doj.split('/').map(Number);
    const joiningDate = new Date(year, month - 1, day);
    const today = new Date();

    const diffInMs = today.getTime() - joiningDate.getTime();
    const msPerYear = 1000 * 60 * 60 * 24 * 365.25; // including leap years approx
    const years = diffInMs / msPerYear;

    return parseFloat(years.toFixed(2)); // e.g. 4.91 years
  }

  getHoursOfSupport(doj: string): number {
    const [day, month, year] = doj.split('/').map(Number);
    const joiningDate = new Date(year, month - 1, day);
    const today = new Date();

    const hoursPerDay = 9;
    const personalLeaveDaysPerYear = 35;

    // Calculate total working days between joiningDate and today (exclude Sat & Sun)
    let totalWorkingDays = 0;
    const currentDate = new Date(joiningDate);

    while (currentDate <= today) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 = Sunday, 6 = Saturday
        totalWorkingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Calculate total years of experience for scaling personal leave days
    const totalYears = this.getYearsOfExperience(doj);

    // Total personal leave days taken (scaled)
    const totalPersonalLeaveDays = personalLeaveDaysPerYear * totalYears;

    // Calculate effective working days after leave deduction
    const effectiveWorkingDays = totalWorkingDays - totalPersonalLeaveDays;

    // Calculate total support hours
    const totalHours = Math.floor(effectiveWorkingDays * hoursPerDay);

    return totalHours;
  }


}
