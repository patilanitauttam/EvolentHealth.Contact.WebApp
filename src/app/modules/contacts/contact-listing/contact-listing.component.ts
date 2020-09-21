import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../shared/models/Contact';

@Component({
  selector: 'app-contact-listing',
  templateUrl: './contact-listing.component.html',
  styleUrls: ['./contact-listing.component.css']
})
export class ContactListingComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {
    this.GetContact();
  }
  GetContact() {
    try {
      this.contactService.GetContacts()
      .subscribe(data => {
        console.log(data);
        this.contacts = data;
      });
      } catch (e) {
      }
  }
  RedirectToContact(contactId) {
    this.router.navigate(['contact/edit-contact', contactId]);
  }
  AddContact() {
    this.router.navigate(['contact/add-contact']);
  }
  DeleteContact(companyId) {
    try {
      this.contactService.DeleteContact(companyId)
      .subscribe(data => {
        this.GetContact();
      });
      } catch (e) {
      }
  }
 }
