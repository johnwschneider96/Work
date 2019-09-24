import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseConfig = {
    apiKey: 'AIzaSyAQBdFrKK2jqQlf8JzxrzyfQMYj8E2EVHw',
    authDomain: 'project2-46235.firebaseapp.com',
    databaseURL: 'https://project2-46235.firebaseio.com',
    projectId: 'project2-46235',
    storageBucket: '',
    messagingSenderId: '594912484040',
    appId: '1:594912484040:web:eccf4d904b975ee542a3fd'
  };
  auth: firebase.auth.Auth;

  constructor() {
    firebase.initializeApp(this.firebaseConfig);
    this.auth = firebase.auth();
   }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }

  async resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email).then(() => console.log('email sent')).catch((error: any) => console.log(error));
  }

  async createUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(() =>
      console.log('user added to firebase')).catch((error: any) => console.log(error));
  }


}
