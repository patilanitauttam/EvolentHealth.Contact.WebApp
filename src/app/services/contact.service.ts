import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contact } from '../shared/models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactServiceUrl = environment.contactServiceUrl + 'api/contact';
  constructor(private http: HttpClient) {
  }
  SaveContact(contactModel: Contact): Observable<any> {
    return this.http.put<any>(this.contactServiceUrl + '/Contact', contactModel);
  }

  GetContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactServiceUrl + '/Contacts');
  }
  GetContact(contactId: number): Observable<Contact> {
    return this.http.get<Contact>(this.contactServiceUrl + '/Contact/' + contactId);
  }
  DeleteContact(contactId: number): Observable<any> {
    return this.http.delete<any>(this.contactServiceUrl + '/Contact/' + contactId);
  }
}
