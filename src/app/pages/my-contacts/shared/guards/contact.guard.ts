import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Contact } from '../interfaces/contact';
import { ContactsService } from './../services/contacts.service';

@Injectable()
export class ContactGuard implements Resolve<Contact> {
  constructor(private contactsService: ContactsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Contact> {
    return this.contactsService.getById(route.params['id']);
  }
}
