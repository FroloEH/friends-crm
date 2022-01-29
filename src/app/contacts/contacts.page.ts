import { Component } from '@angular/core';
import {Contact} from './contact.model'
import { ContactService } from './contactService';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss']
})
export class ContactsPage {
  contacts: Contact[];

  constructor(private contactService: ContactService) {
  }

  ngDoCheck(){
    this.contacts = this.contactService.getAllContacts();
  }

}
