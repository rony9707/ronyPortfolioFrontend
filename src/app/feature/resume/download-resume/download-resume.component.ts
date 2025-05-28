import { Component, inject, Input } from '@angular/core';
import swal from 'sweetalert2';
import { BackendService } from '../../../shared/services/backend/backend.service';

@Component({
  selector: 'app-download-resume',
  standalone: true,
  imports: [],
  templateUrl: './download-resume.component.html',
  styleUrl: './download-resume.component.css'
})
export class DownloadResumeComponent {

  @Input() resumeDownloadLink?: string;

  loading = false;
  private backendServer = inject(BackendService);

  download(): void {
    if (!this.resumeDownloadLink) {
      this.showError('Download link not available.');
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.triggerDownload(this.resumeDownloadLink!, 'Agnibha_Chowdhury_Resume.pdf');
      this.loading = false;

      this.showSuccess('Your resume has been downloaded successfully!').then(() => {
        this.promptEmailAndSendPassword();
      });
    }, 2000);
  }

  private triggerDownload(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private async showSuccess(message: string) {
    return swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      background: '#e9f7ef',
      iconColor: '#28a745'
    });
  }

  private showError(message: string): void {
    swal.fire({
      title: 'Error',
      text: message,
      icon: 'error'
    });
  }

  private promptEmailAndSendPassword(): void {
    swal.fire({
      title: 'Your email address',
      input: 'email',
      inputLabel: 'Enter your email address for password',
      inputPlaceholder: 'Enter your email address',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      customClass: {
        confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700',
        cancelButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
      },
      preConfirm: (email) => {
        if (!email) {
          swal.showValidationMessage('Please enter a valid email address');
          return false;
        }

        this.backendServer.sentResumePassword({ email }).subscribe({
          next: (res) => {
            swal.fire({
              title: 'Email Sent Successfully',
              text: res.message,
              icon: 'success',
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false
            });
          },
          error: (err) => {
            this.showError(err?.error?.message || 'Failed to send email.');
          }
        });

        return true;
      }
    });
  }

}
