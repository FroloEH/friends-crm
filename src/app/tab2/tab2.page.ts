import { Component } from '@angular/core';
import { ContactService } from '../contacts/contactService';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public newName :string;
  public newMail :string;


  onAddContact(){
          this.contactService.addContact(this.newName, this.newMail);
          this.router.navigate(['tabs/contacts']);
  };

  constructor(private contactService:ContactService,
    private router: Router) {}

}
