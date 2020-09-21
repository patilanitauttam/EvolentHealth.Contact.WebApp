import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../models/Contact';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  userData: Contact = new Contact();
  contactId: number;
  @Input() isEdit: boolean;
  /*phone masking*/
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
              private fb: FormBuilder, private contactService: ContactService,
              private activateRoute: ActivatedRoute, private router: Router) {
    this.CreateForm();
   }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.contactId = params.id;
      this.GetContact();
    });
  }
  CreateForm() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      primaryEmail: ['', [Validators.required, Validators.email,
      Validators.pattern('[a-zA-Z0-9\'.+_-]{1,}@[a-zA-Z0-9.-]{1,}[.]{1}[a-zA-Z0-9-_]{1,}')]],
      phoneNumber: ['', Validators.required],
    });
  }
  formatPhoneNumber(phoneNumberString) {
    if (phoneNumberString.value.length > 1) {
      const cleaned = ('' + phoneNumberString.value).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        this.contactForm.controls.phoneNumber.setErrors({isInValidphoneNumber: false});
        this.contactForm.controls.phoneNumber.updateValueAndValidity();
      } else {
        this.contactForm.controls.phoneNumber.setErrors({isInValidphoneNumber: true});
      }
    } else {
      this.contactForm.controls.phoneNumber.setErrors({isInValidphoneNumber: false});
      this.contactForm.controls.phoneNumber.updateValueAndValidity();
    }
  }
  OnFormSubmit() {
    this.MarkControlsAsTouched(this.contactForm);
    if (this.contactForm.invalid) {
      return;
    }
    console.log(this.userData);
    this.SaveContact();

  }
   // mark controls as touched
   MarkControlsAsTouched(formRef: FormGroup) {
    for (const property in formRef.controls) {
      if (property) {
        formRef.controls[property].markAsTouched();
      }
    }
  }
  SaveContact() {
    try {
      this.userData.phoneNumber = ('' + this.userData.phoneNumber).replace(/\D/g, '');
      this.userData.userId = 1;
      this.contactService.SaveContact(this.userData)
      .subscribe(data => {
        this.router.navigate(['contact-listing']);
      });
      } catch (e) {
      }
  }

  GetContact() {
    try {
      this.contactService.GetContact(this.contactId)
      .subscribe(data => {
        console.log(data);
        this.userData = data;
      });
      } catch (e) {
      }
  }
}
