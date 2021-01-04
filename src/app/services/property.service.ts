import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Property } from '../interfaces/property';
import 'firebase/storage';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private af: AngularFirestore) {}

  createProperty(data: Property): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const id: string = this.af.createId();
        const images: string[] = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.images.length; i++) {
          const img = data.images[i];
          const url = await this.uploadPhoto(img, `properties/${id}/${i}`);
          images.push(url);
        }
        data.images = images;
        data.id = id;
        data.createdAt = new Date();
        await this.af.doc(`properties/${id}`).set(data);
        resolve(id);
      } catch (e) {
        reject(e);
      }
    });
  }

  updateProperty(data: Property, id: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const images: string[] = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.images.length; i++) {
          const img = data.images[i];
          if (img.substring(0, 7) === 'http://' || img.substring(0, 8) === 'https://') {
          images.push(img);
          }else{
          const url = await this.uploadPhoto(img, `properties/${id}/${i}`);
          images.push(url);
          }
        }
        data.images = images;
        await this.af.doc(`properties/${id}`).update(data);
        resolve(id);
      } catch (e) {
        reject(e);
      }
    });
  }

  getProperty(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.af
          .doc(`properties/${id}`)
          .valueChanges()
          .pipe(first())
          .toPromise();
        if (res) {
          resolve(res);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  getPropertiesByOwner(uid: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const ref = firebase.firestore().collection('properties');
        const res = await ref.where('uid', '==', uid).get();
        const properties = res.docs.map((property) => {
          const data = property.data();
          data.id = property.id;
          return data;
        });
        if (properties) {
          resolve(properties);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  async getAllProperties(): Promise<any> {
    return await this.af.collection('properties').valueChanges().pipe(first()).toPromise();
  }

  getPropertiesByDate(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const ref = firebase.firestore().collection('properties');
        const res = await ref.orderBy('createdAt', 'desc').limit(8).get();
        const properties = res.docs.map((property) => {
          const data = property.data();
          data.id = property.id;
          return data;
        });
        if (properties) {
          resolve(properties);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  async deleteProperty(id: string): Promise<any> {
    return await this.af.doc(`properties/${ id }`).delete();
  }


  uploadPhoto(file: any, path: string): Promise<string> {
    const storeRef = firebase.storage().ref();
    return new Promise((resolve, reject) => {
      const uploadTask: firebase.storage.UploadTask = storeRef
        .child(path)
        .putString(file, 'data_url', { contentType: 'image/jpeg' });

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('loading');
        },
        (err) => {
          reject(err);
        },
        () => {
          storeRef
            .child(path)
            .getDownloadURL()
            .then((res) => {
              const url = res;
              resolve(url);
            })
            .catch((err) => {
              reject(err);
            });
        }
      );
    });
  }
}
