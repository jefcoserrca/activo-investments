import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import {  AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { rejects } from 'assert';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
declare var $;
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private user: Observable< firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private af: AngularFirestore,
    private router: Router
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

  recoveryPassword(formData): Promise<boolean> {
    return new Promise ( async (resolve, reject) => {
      try {
        await this.afAuth.sendPasswordResetEmail(formData.email);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  changePassword(formData): Promise<boolean> {
    return new Promise ( async (resolve, reject) => {
      try {
        const user: firebase.User = firebase.auth().currentUser;
        const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(user.email, formData.password);
        await user.reauthenticateWithCredential(credential);
        await user.updatePassword(formData);
        resolve(true);
      }catch (e) {
        reject(e);
      }
    }
    );
  }

  logout(): Promise <boolean> {
    return new Promise( async (resolve, rejec) => {
      try {
        await firebase.auth().signOut();
        resolve(true);
      } catch (e) {
        rejects(e);
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    return new Promise( (resolve, reject) => {
      this.afAuth.onAuthStateChanged( async (res) => {
        if (res){
          resolve(true);
        }else{
          await this.router.navigateByUrl('');
          $('#signupModal').modal('show');
          resolve (false);
        }
      });
    });
  }
}
