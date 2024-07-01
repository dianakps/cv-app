import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from './interfaces/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpClient = inject(HttpClient);
  apiUrl = 'http://localhost:3000';
  constructor() {}

  getUsers() {
    return this.httpClient.get<User[]>(this.apiUrl + '/users');
  }

  getUser(username: String) {
    return this.httpClient.get<User[]>(this.apiUrl + `/users/${username}`);
  }

  addUser(model: User) {
    return this.httpClient.post(this.apiUrl + '/users', model, {
      responseType: 'text',
    });
  }

  updateUser(username: String, newKey: String, newValue: any) {
    const requestBody = [newKey, newValue];
    console.log(requestBody);
    return this.httpClient.put(this.apiUrl + `/users/${username}`, requestBody);
  }

  editUser(
    username: String,
    field: String,
    index: Number,
    key: String,
    newValue: any
  ) {
    const requestBody = [[`${field}.${index}.${key}`], newValue];
    console.log(requestBody);
    return this.httpClient.put(this.apiUrl + `/users/${username}`, requestBody);
  }

  editUser2(username: String, field: String, newValue: String) {
    const requestBody = [[`${field}`], newValue];
    return this.httpClient.put(this.apiUrl + `/users/${username}`, requestBody);
  }

  deleteUser(username: String) {
    return this.httpClient.delete(this.apiUrl + `/users/${username}`);
  }
}
