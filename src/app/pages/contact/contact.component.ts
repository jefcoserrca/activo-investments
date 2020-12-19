import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { EmailSenderService } from '../../services/email-sender.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  form: FormGroup;
  showMessage: boolean;
  showLoading: boolean;
  constructor( private formBuilder: FormBuilder, private sender: EmailSenderService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose(
        [ Validators.required,
         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
       )),
      subject: new FormControl (''),
      message: new FormControl('', Validators.required)
    });
  }

  async send(): Promise <any> {
    this.showMessage = false;
    this.showLoading = true;
    const response = await this.sender.sendToContact(this.form.value).catch(() => {
      this.showLoading = false;
    });
    this.showLoading = false;
    if (response) {
      this.showMessage = true;
      this.form.reset();
      setTimeout(() => {
        this.showMessage = false;
      }, 2500);
    }
  }

}
