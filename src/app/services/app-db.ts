import Dexie from 'dexie';
import { User } from '../models/user';

export class AppDb extends Dexie {
    notes: Dexie.Table<User, string>;

    constructor() {
      super('Users');
      this.version(1).stores({
        users: 'id++,name,email,password,gender,dob,address,contact,country'
        // In actuality, would not store password in local IndexedDB but use an Authentication Service
      });
    }
  }
