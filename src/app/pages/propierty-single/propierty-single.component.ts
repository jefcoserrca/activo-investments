import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  faArrowLeft,
  faArrowRight,
  faComment,
  faExclamationCircle,
  faImages,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { PropertyService } from 'src/app/services/property.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/interfaces/property';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { EmailSenderService } from '../../services/email-sender.service';
import {
  faFacebook,
  faWhatsapp,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Title, Meta } from '@angular/platform-browser';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../interfaces/user';
declare var $;
@Component({
  selector: 'app-propierty-single',
  templateUrl: './propierty-single.component.html',
  styleUrls: ['./propierty-single.component.scss'],
})
export class PropiertySingleComponent implements OnInit {
  faExclamation = faExclamationCircle;
  faFb = faFacebook;
  faWhats = faWhatsapp;
  faTwitter = faTwitter;
  faImages = faImages;
  faOpinion = faComment;
  faStar = faStar;
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
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };
  images: GALLERY_IMAGE[] = [];
  agent: User;
  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private propertySrv: PropertyService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private sender: EmailSenderService,
    private userSrv: UserDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    await this.getProperty();
    this.agent = await this.userSrv.getUser(this.property.uid);
    this.images = this.property.images.map((image) => ({ url: image, altText: this.property.title }));
    this.titleService.setTitle(this.property.title);
    this.metaTagService.addTags([
      {
        name: 'keywords',
        content: `Activo Investments- ${this.property.title}, ${this.property.description} en ${this.property.address}, ${this.property.type}`,
      },
      { name: 'robots', content: 'no-index' },
      { name: 'googlebot', content: 'no-index' },
      { name: 'author', content: 'Activo Investments' },
    ]);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.property.youtubeUrl
    );
    this.initForm();
    this.loading = false;
    this.hideMessage();
    this.onHover();
  }

  private async getProperty(): Promise<Property> {
    return (this.property = await this.propertySrv.getProperty(this.id));
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      message: new FormControl('', Validators.required),
    });
  }

  async send(): Promise<any> {
    this.showMessage = false;
    this.showLoading = true;
    const data = {
      ...this.form.value,
      id: this.property.id,
      address: this.property.address,
      city: this.property.city,
      mailTo: this.agent.email
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

  openGallery(index: number): void {
    this.ngxImageGallery.open(index);
  }

  hideMessage(): void {
    setTimeout(() => {
    console.log('exe');
    console.log($('.message-gallery'));
    $('.message-gallery').addClass('fade');
    }, 5000);
  }

  onHover(): void {
    $(document).on('mouseover', '.banner', () => {
      $('.message-gallery').removeClass('fade');
      $('.banner').addClass('brightness');
    });

    $(document).on('mouseleave', '.banner', () => {
        $('.message-gallery').addClass('fade');
        $('.banner').removeClass('brightness');
    });
  }
}
