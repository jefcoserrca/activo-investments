import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { PropertyService } from './property.service';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private af: AngularFirestore,
    private propertySrv: PropertyService
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
    return new Promise (async (resolve, reject) => {
      try {
        if (data.imgProfile.substring(0, 7) === 'http://' || data.imgProfile.substring(0, 8) === 'https://') {
             data.imgProfile = data.imgProfile;
          }else{
            data.imgProfile = await this.propertySrv.uploadPhoto(data.imgProfile, `/users/${uid}`);
          }
        await this.af.doc(`users/${ uid }`).update(data);
        resolve (true);
      }catch (e) {
        reject(e);
      }
    });
  }

  async setQualify(uid: string, data: any): Promise <any> {
    return new Promise ( async (resolve, reject) => {
      try {
        const opinionId = this.af.createId()
        await this.af.doc(`users/${uid}/opinions/${ opinionId }`).set(data);
        const opinions = await this.af.collection(`users/${uid}/opinions`).valueChanges().pipe(first()).toPromise();
        let total = 0;
        opinions.forEach((opinion: any ) => total = total + opinion.stars);
        const stars = total / opinions.length;
        await this.af.doc(`users/${uid}`).update({ ranking: stars });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getOpinions(uid: string): Promise <any> {
    return new Promise ( async (resolve, reject) => {
      try {
        const opinions = await this.af.collection(`users/${uid}/opinions`).valueChanges().pipe(first()).toPromise();
        let total = 0;
        opinions.forEach((opinion: any ) => total = total + opinion.stars);
        const stars = total / opinions.length;
        resolve({stars, opinions });
      } catch (error) {
        reject(error);
      }
    });
  }

}
