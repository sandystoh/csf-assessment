import { Injectable } from '@angular/core';
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
      user.id = 'USR008', // randomly assigned ID, would normally be generated in running order for a full db
      user.regDate = moment(Date.now()).format('DD MMMM YYYY');
      this.currentUser = user;
      resolve();
    }
    reject();
  });
  // In actuality, would not store password but encrypt/use an Authentication Service
}

getCurrentUser(): User {
  return this.currentUser;
}

getCurrentUserNoPassword(): User {
  this.currentUser.password = '';
  // To Remove/Mask the Password from Response - for http request can use pipe/map
  return this.currentUser;
}
}

