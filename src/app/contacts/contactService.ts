import {Contact} from './contact.model'
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class ContactService{
      private Contacts : Contact[] = [
        {
          name: "Ferdo Bobula",
          email: "richard.frolkovic@event.horizon.sk"
      }];;

      public getAllContacts(){
          return [...this.Contacts];
      }

      public addContact(newName:string, newMail:string){
            this.Contacts.push({
                name: newName,
                email: newMail})
      }
  }