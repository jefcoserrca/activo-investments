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
        await this.af.doc(`properties/${id}`).set(data);
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
          console.log(res);
          resolve(res);
        }
      } catch (e) {
        reject(e);
      }
    });
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
