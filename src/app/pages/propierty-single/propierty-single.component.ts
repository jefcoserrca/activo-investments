import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { faArrowLeft, faArrowRight, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { PropertyService } from 'src/app/services/property.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/interfaces/property';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-propierty-single',
  templateUrl: './propierty-single.component.html',
  styleUrls: ['./propierty-single.component.scss']
})
export class PropiertySingleComponent implements OnInit {
  faExclamation = faExclamationCircle;
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
  constructor(
    private propertySrv: PropertyService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    await this.getProperty();
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.property.youtubeUrl);
    this.loading = false;
  }

  private async getProperty(): Promise<Property> {
   return this.property =  await this.propertySrv.getProperty(this.id);
  }

}
