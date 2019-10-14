import { Injectable } from '@angular/core';
import { AppDb } from './app-db';
import { User } from '../models/user';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 reset = {  name: '',  email: '',  password: '',  gender: '',  dob: '',  address: '',  contact: '',  country: '' };
 currentUser: User = { ...this.reset };

  constructor() {
  }

resetCurrent() {
  this.currentUser = { ...this.reset };
}

saveCurrentUser(user: User) {
  return new Promise((resolve, reject) => {
    if (user !== undefined) {
      user.id = 'USR008',
      user.regDate = moment(Date.now()).format('DD MMMM YYYY');
      this.currentUser = user;
      resolve();
    }
    reject();
  });
  // In actuality, would not store password but use an Authentication Service
}

getCurrentUser(): User {
  return this.currentUser;
}
}

