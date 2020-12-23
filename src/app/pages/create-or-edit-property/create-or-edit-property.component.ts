import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Coords } from '../../interfaces/coords';
declare var google: any;
@Component({
  selector: 'app-create-or-edit-property',
  templateUrl: './create-or-edit-property.component.html',
  styleUrls: ['./create-or-edit-property.component.scss']
})
export class CreateOrEditPropertyComponent implements OnInit {
  path: any;
  faCamera = faCamera;
  images: any[] = [];
  form: FormGroup;
  coords: Coords = { latitude: 0, longitude: 0 };
  zoom: number;
  geoCoder: any;
  address: string;
  @ViewChild('search', {static: false}) public searchElementRef: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private imageCompress: NgxImageCompressService,
              private builder: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  async ngOnInit(): Promise<void> {
    this.path = (await this.activatedRoute.url.pipe(first()).toPromise())[0].path;
    this.initMap();
    this.initForm();
  }

  initForm(): void {
    this.form = this.builder.group({
      suburb: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl(),
      area: new FormControl('', Validators.required),
      rooms: new FormControl('', Validators.required),
      youtube: new FormControl(),
      images: new FormControl([], Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl(''),
      type: new FormControl('')
    });
  }
  initMap(): void{
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();

      this.geoCoder = new google.maps.Geocoder();

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {

          const place: any = autocomplete.getPlace();
          console.log(place);
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.getAddress(place.geometry.location.lat(), place.geometry.location.lng()).then(() => {

          this.coords.latitude = place.geometry.location.lat();
          this.coords.longitude = place.geometry.location.lng();
          this.zoom = 18;
          });
        });
      });
    });
  }

  async uploadPhoto(): Promise<any> {
    const img = await this.imageCompress.uploadFile();
    const result = await this.imageCompress.compressFile(img.image, img.orientation);
    this.images.push(result);
  }

  private setCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coords.latitude = position.coords.latitude;
        this.coords.longitude = position.coords.longitude;
        this.getAddress(this.coords.latitude, this.coords.longitude);
        this.zoom = 18;
      });
    }
  }

  async getAddress(latitude, longitude): Promise<void> {
  this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 18;
        const geocoder: any [] = results[0].address_components;
        const state = geocoder.find( (address) => {
          return address.types[0] === 'administrative_area_level_1';
        });
        const city = geocoder.find( (address) => {
          return address.types[0] === 'locality';
        });
        const zipcode = geocoder.find( (address) => {
          return address.types[0] === 'postal_code';
        });

        const suburb = geocoder.find( (address) => {
          return address.types[0] === 'sublocality_level_1';
        });
        console.log(state, city, zipcode, suburb);
        this.address = results[0].formatted_address;

      } else {
        window.alert('No hay resultados');

      }
    } else {
      window.alert('Geocoder error: ' + status);
    }
  });
  }

  markerDragEnd($event: any): void {
    this.coords.latitude = $event.latLng.lat();
    this.coords.longitude = $event.latLng.lng();
    this.getAddress(this.coords.latitude, this.coords.longitude);
    }

}
