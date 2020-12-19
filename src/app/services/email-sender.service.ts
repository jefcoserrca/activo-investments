import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {
  private api = 'https://mailthis.to/activoi.contacto@gmail.com';
  constructor(
    private http: HttpClient,
    private af: AngularFirestore
  ) { }

   sendToContact(form: any): Promise<any> {
    const id = this.af.createId();
    return new Promise (async (resolve, reject) => {
      try {
       await this.af.doc(`contactMessages/${id}`).set(form);
       resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }
}
