import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  copyToClipboard(text: string):void {
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
}
