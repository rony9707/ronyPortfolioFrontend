import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  copyToClipboard(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');

    swal.fire({
      text: 'Copied to Clipboard!',
      icon: 'success',
      timer: 1500, // Auto close after 1.5 seconds
      timerProgressBar: true, // Show progress bar
      showConfirmButton: false, // Hide the "OK" button
      toast: true, // Make it a toast notification
      position: 'top-end', // Position it at the top end
      background: '#f0f0f0', // Custom background color
      iconColor: '#2ee08c', // Custom icon color for success/error
      customClass: {
        popup: 'swal2-custom-popup' // Add custom CSS class
      },
      didOpen: () => {
        const progressBar = swal.getTimerProgressBar();
        if (progressBar) {
          progressBar.style.background = '#2ee08c'; // Custom progress bar color
        }
      }
    });

    document.body.removeChild(textarea);
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
