import { contactStore } from "../store/Store";

class ContactService {

  addContact(name : string, email : string) {
    contactStore.state.contacts.push({name, email});
  }

  getAllContacts() {
    return contactStore.state.contacts;
  }
}

export const contactService = new ContactService();
