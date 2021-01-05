import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { faArrowLeft, faArrowRight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { PropertyService } from 'src/app/services/property.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/interfaces/property';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailSenderService } from '../../services/email-sender.service';
import { faFacebook, faWhatsapp, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-propierty-single',
  templateUrl: './propierty-single.component.html',
  styleUrls: ['./propierty-single.component.scss']
})
export class PropiertySingleComponent implements OnInit {
  faExclamation = faExclamationCircle;
  faFb = faFacebook;
  faWhats = faWhatsapp;
  faTwitter = faTwitter;
  left = faArrowLeft;
  rigth = faArrowRight;
  id: string;
  loading = true;
   optionsCarousel: OwlOptions = {
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    navText: ['<', '>'],
    items: 1,
  };
  property: Property;
  safeUrl: SafeUrl;
  form: FormGroup;
  showMessage: boolean;
  showLoading: boolean;
  constructor(
    private propertySrv: PropertyService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private sender: EmailSenderService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    await this.getProperty();
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(('https://www.youtube.com/embed/' + this.property.youtubeUrl));
    this.initForm();
    this.loading = false;
  }

  private async getProperty(): Promise<Property> {
   return this.property =  await this.propertySrv.getProperty(this.id);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose(
        [ Validators.required,
         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
       )),
      message: new FormControl('', Validators.required)
    });
  }

  async send(): Promise <any> {
    this.showMessage = false;
    this.showLoading = true;
    const data = {
      ...this.form.value,
      id: this.property.id,
      address: this.property.address,
      city: this.property.city
    };
    const response = await this.sender.sendPropertyToContact(data).catch(() => {
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
