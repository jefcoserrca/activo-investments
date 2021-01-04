import { Component, OnInit } from '@angular/core';
import { OwlOptions} from 'ngx-owl-carousel-o';
import { faHome, faHandHoldingUsd, faHandshake, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ConfigService } from '../../services/config.service';
import { Property } from '../../interfaces/property';
import { PropertyService } from 'src/app/services/property.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faHome = faHome;
  faMoney = faHandHoldingUsd;
  faHands = faHandshake;
  faArrow = faArrowRight;
  bannerItems: any [];
  recommProperties: Array <Property>;
  lastProperties: Array <Property>;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  };

  propiertyOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false,
    autoHeight: true,
  };

  newsOptions: OwlOptions = {
      loop: true,
      margin: 30,
      responsive: {
        0: {
          items: 1,
        },
        769: {
          items: 2,
        },
        992: {
          items: 3,
        }
      }
  };

  constructor(
    private configSrv: ConfigService,
    private propertiesSrv: PropertyService
  ) { }

  async ngOnInit(): Promise<any> {
    const res = await this.configSrv.getConfig();
    this.bannerItems = res.banner;
    this.recommProperties = res.recommendations;
    console.log(this.recommProperties);
    this.lastProperties = await this.propertiesSrv.getPropertiesByDate();
    console.log(this.lastProperties);
  }

  traslateCarousel(): void {
    $('.intro-content .intro-title').addClass('zoomIn animated').show();
    $('.intro-content .intro-price').addClass('fadeInUp animated').show();
    $('.intro-content .intro-title-top, .intro-content .spacial').addClass('fadeIn animated').show();
  }

  changeCarousel(): void {
    $('.intro-content .intro-title').removeClass('zoomIn animated').hide();
    $('.intro-content .intro-price').removeClass('fadeInUp animated').hide();
    $('.intro-content .intro-title-top, .intro-content .spacial').removeClass('fadeIn animated').hide();
  }


}

