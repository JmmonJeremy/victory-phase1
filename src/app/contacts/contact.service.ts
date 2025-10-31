import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];
  contactsListClone: Contact[];
  maxContactId: number;

  constructor() {
        this.contacts = MOCKCONTACTS;
     }

  getContacts(): Contact[] {
    return this.contacts.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  getContact(id: string): Contact {     
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact){
    if (!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);  
  }  

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
        return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
        return;
    }
    this.contacts.splice(pos, 1);
    this.contactsListClone = this.contacts.slice()
    this.contactListChangedEvent.next(this.contactsListClone);
  }
}
