import { Injectable } from '@angular/core';
import { AppDb } from './app-db';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  db: any;

  constructor() {
      this.db = new AppDb();
  }

  getAll() {
    return this.db.users.toArray();
  }

  get(id) {
    return this.db.users.get(id);
  }

  add(data: User) {
  return this.db.users.add(data);
  // In actuality, would not store password in local IndexedDB but use an Authentication Service
  }

  update(id, data) {
  return this.db.users.update(id, data);
  }

  remove(id) {
  return this.db.users.delete(id);
  }
}

