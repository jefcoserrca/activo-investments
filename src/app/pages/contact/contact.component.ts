import { Component, OnInit } from '@angular/core';
import { faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  constructor() { }

  ngOnInit(): void {
  }

}
