import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList implements OnInit, OnDestroy {  
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(private contactService: ContactService) {

  }
  
  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contactList: Contact[])=> {
          this.contacts = contactList.sort((a, b) => a.name.localeCompare(b.name));
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

