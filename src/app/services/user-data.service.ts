import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private af: AngularFirestore
  ) { }
  async getUser(uid: string): Promise <any> {
    return new Promise (async (resolve, reject) => {
      try {
        const user = await this.af.doc(`users/${ uid }`).valueChanges().pipe(first()).toPromise();
        resolve (user);
      }catch (e) {
        reject(e);
      }
    });
  }

   async updateUser(uid: string, data: any): Promise <any> {
    return new Promise (async(resolve, reject) => {
      try {
        await this.af.doc(`users/${ uid }`).update(data);
        resolve (true);
      }catch (e) {
        reject(e);
      }
    });
  }
}
