import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface Contacts {
  contacts: [{
    name: string,
    email: string,
  }]
}

export const key: InjectionKey<Store<Contacts>> = Symbol();

export const contactStore = createStore<Contacts>({
  state: {
      contacts: [
        {
            name: "Ferdo Bobula",
            email: "richard.frolkovic@event.horizon.sk"
        },
      ],
  },});