import { Component } from '@angular/core';

@Component({
  selector: 'app-resume-summary',
  standalone: true,
  imports: [],
  templateUrl: './resume-summary.component.html',
  styleUrl: './resume-summary.component.css'
})
export class ResumeSummaryComponent {
  yearsOfexp = 0

  ngOnInit(): void {
    this.calculateMetrices();
  }

  aboutMe = `
  Innovative and deadline-driven Software Developer with  ${this.calculateMetrices()} years of experience in 
  creating efficient and innovative software solutions and front end development.
  `

  calculateMetrices() {
    let doj = '23/06/2020';

    // Calculate IT experience------------------------------------------------------------------------
    let [day, month, year] = doj.split('/').map(Number);  // Split doj to day, month and year which all have type number
    let dateOfJoining = new Date(year, month - 1, day);

    let currentDate = new Date();
    let timeDifference = currentDate.getTime() - dateOfJoining.getTime();
    let yearsOfExperience = timeDifference / (1000 * 60 * 60 * 24 * 365.25);
    yearsOfExperience = Math.round(yearsOfExperience * 10) / 10;

    return yearsOfExperience
  }
}
