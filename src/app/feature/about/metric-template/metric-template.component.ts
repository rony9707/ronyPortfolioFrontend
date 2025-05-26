import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Metric } from '../../../shared/interface/IAgnibhaProfile.interface';

@Component({
  selector: 'app-metric-template',
  standalone: true,
  imports: [],
  templateUrl: './metric-template.component.html',
  styleUrl: './metric-template.component.css'
})
export class MetricTemplateComponent {
  @Input()
  metric?: Metric

  @ViewChild('metricCount', { static: false }) metricCount!: ElementRef;
  

  ngAfterViewInit(): void {

    // Create an IntersectionObserver
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.startCounterAnimation();
          }, 300);
          observer.disconnect(); // Stop observing once the div is visible
        }
      });
    });

    // Observe the target div
    observer.observe(this.metricCount.nativeElement);
  }

  startCounterAnimation(): void {
    let target = this.metric?.count || 0;
    let currentCount = parseFloat(this.metricCount.nativeElement.textContent);
    let difference = target - currentCount;
    let duration = 2500;
    let increment = difference / (duration / 50);

    let interval = setInterval(() => {
      currentCount += increment;

      if ((increment > 0 && currentCount > target) || (increment < 0 && currentCount < target)) {
        currentCount = target;
        clearInterval(interval);
      }

      let formattedCount = target % 1 === 0 ? currentCount.toFixed(0) : currentCount.toFixed(1);
      formattedCount = parseFloat(formattedCount).toString();

      this.metricCount.nativeElement.textContent = formattedCount;

      if (currentCount === target) {
        clearInterval(interval);
      }
    }, 50);
  }


  getYearsOfExperience(doj: string): number {
    const [day, month, year] = doj.split('/').map(Number);
    const joiningDate = new Date(year, month - 1, day);
    const today = new Date();

    let years = today.getFullYear() - joiningDate.getFullYear();
    const monthDiff = today.getMonth() - joiningDate.getMonth();
    const dayDiff = today.getDate() - joiningDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      years--;
    }

    return years;
  }

  getHoursOfSupport(doj: string): number {
    const [day, month, year] = doj.split('/').map(Number);
    const joiningDate = new Date(year, month - 1, day);
    const today = new Date();

    const msInHour = 1000 * 60 * 60;
    return Math.floor((today.getTime() - joiningDate.getTime()) / msInHour);
  }
}
