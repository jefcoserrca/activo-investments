import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import {  AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable< firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private af: AngularFirestore
  ) {
    this.user = this.afAuth.authState;
  }

  get authenticated(): boolean {
    return this.user != null; // True ó False
  }

  get currentUser(): Observable<firebase.User | null> {
    return this.user;
  }

  createUser( userData: any): Promise<any> {

    return new Promise( async (resolve, reject) => {

      try {
        const credential =  await this.afAuth.createUserWithEmailAndPassword(userData.email, userData.password);
        const user: User = {
          name: userData.name,
          email: userData.email,
          role: 'client',
        };

        const res = await this.saveData(user, credential.user.uid);

        resolve(res);
      } catch (e) {

        reject(e);
      }

    });
  }

  saveData( user: User, id: string ): Promise<any> {
    return new Promise ( async (resolve, reject) => {
        await this.af.doc(`users/${ id }`).set(user);

        resolve(true);
    });
  }

   loginWithEmail(userData: any): Promise<any> {
    return new Promise( async (resolve, reject) => {
      const res = await this.afAuth.signInWithEmailAndPassword(userData.email, userData.password).catch((e) => {
        reject(e);
      });
      resolve( res );
    });
  }

  async AuthLogin(provider: any): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithPopup(provider);
  }

  FacebookAuth(): Promise<firebase.auth.UserCredential> {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }
}
