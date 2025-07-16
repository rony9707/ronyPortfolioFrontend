import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Output, QueryList, ViewChild, ViewChildren, EventEmitter, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntersectionObserverDirective } from '../../../shared/directive/intersection-observer.directive';

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

  @Output()
  DataInForm: EventEmitter<object> = new EventEmitter<object>();
  @Output()
  anyFieldTouchedStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    //Sent Formdata to Parent Compoent
    this.DataInForm.emit(this.sendMessage.value)//Sending data to parent compoent
    this.touchedOrNot();
  }


  // Form Group and Form Control Validators
  sendMessage = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });


  // canExit(): boolean {
  //   if (this.sendMessage.value.fullname === '' ||
  //       this.sendMessage.value.email === '' ||
  //       this.sendMessage.value.subject === '' ||
  //       this.sendMessage.value.message === '') {
  //     return confirm("You have unsaved changes. Do you want to navigate away?");
  //   } else {
  //     return true;
  //   }
  // }

  sendMessageEmail() {


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
      console.log(this.sendMessage.value)
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

  touchedOrNot() {
    if (this.inputFields) {
      this.inputFields.forEach((field: ElementRef) => {
        field.nativeElement.addEventListener('blur', () => {
          this.fieldisTouched = true;
          this.anyFieldTouchedStatus.emit(this.fieldisTouched); // Emit the status if necessary
        });
      });
    }
  }
}
