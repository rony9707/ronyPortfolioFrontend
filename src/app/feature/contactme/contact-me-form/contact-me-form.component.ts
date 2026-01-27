import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Output, QueryList, ViewChild, ViewChildren, EventEmitter, AfterViewChecked, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntersectionObserverDirective } from '../../../shared/directive/intersection-observer.directive';
import { BackendService } from '../../../shared/services/backend/backend.service';

@Component({
  selector: 'app-contact-me-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IntersectionObserverDirective],
  templateUrl: './contact-me-form.component.html',
  styleUrl: './contact-me-form.component.css'
})
export class ContactMeFormComponent {

  @ViewChildren('inputField') inputFields: QueryList<ElementRef> | undefined;
  @ViewChild('ConnectMeButton') ConnectMeButton: ElementRef | undefined;

  loading: boolean = false;

  private backendServer = inject(BackendService);


  // Form Group and Form Control Validators
  sendMessage = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });


  sendMessageEmail() {
    this.sendMessage.markAllAsTouched()

    //Handle Button Click Effect Here
    if (this.ConnectMeButton) {
      this.ConnectMeButton.nativeElement.classList.add('connectme-button-click-animation')
      setTimeout(() => {
        if (this.ConnectMeButton) {
          this.ConnectMeButton.nativeElement.classList.remove('connectme-button-click-animation')
        }
      }, 200)
    }


    // Code if form is invalid
    if (!this.sendMessage.valid) {
      // Highlight invalid fields and add shake animation
      this.highlightInvalidFields();

    } else {
      // Perform the form submission here
      this.loading = true;
      //Sent Email to the user
      this.backendServer.sentEmailConnectWithMe(this.sendMessage.value).subscribe(
        (res) => {


          swal.fire({
            title: "Email Sent successfully",
            text: res.message,
            icon: "success",
            timer: 1500, // Auto close after 2 seconds
            timerProgressBar: true, // Show progress bar
            showConfirmButton: false // Hide the "OK" button
          });

          this.loading = false;
          this.sendMessage.reset();

        },
        (err) => {
          console.log(err)
          this.loading = false;
          swal.fire({
            title: "Error",
            text: err?.error?.message || "Something went wrong!",
            icon: "error"
          });
        }
      )
    }
  }

  highlightInvalidFields() {
    if (this.inputFields) {
      this.inputFields.forEach((field: ElementRef) => {
        const controlName = field.nativeElement.getAttribute('formControlName');

        // Assert controlName is a valid key of sendMessage.controls
        if (controlName && this.sendMessage.controls[controlName as keyof typeof this.sendMessage.controls] && this.sendMessage.controls[controlName as keyof typeof this.sendMessage.controls].invalid) {
          field.nativeElement.classList.add('shake');

          // Remove the shake class after animation completes
          setTimeout(() => {
            field.nativeElement.classList.remove('shake');
          }, 500);
        }
      });
    }
  }


  // Code for input field validator text
  get fullnameValidator() {
    return this.sendMessage.get('fullname');
  }

  get emailValidator() {
    return this.sendMessage.get('email');
  }

  get subjectValidator() {
    return this.sendMessage.get('subject');
  }

  get messageValidator() {
    return this.sendMessage.get('message');
  }

  // Function which will help to type only alphabets
  onlyAlphabets(event: KeyboardEvent) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 32)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  fieldisTouched = false

}
