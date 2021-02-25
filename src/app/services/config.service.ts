import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private af: AngularFirestore) {}

  async updateConfig(data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.af.doc('config/home').update(data);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  async getConfig(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const res = await this.af.doc('config/home').valueChanges().pipe(first()).toPromise();
      resolve(res);
    });
  }

  async getConfigAboutUs(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const res = await this.af.doc('config/aboutUs').valueChanges().pipe(first()).toPromise();
      resolve(res);
    });
  }

  async getConfigContact(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const res = await this.af.doc('config/contact').valueChanges().pipe(first()).toPromise();
      resolve(res);
    });
  }
}
