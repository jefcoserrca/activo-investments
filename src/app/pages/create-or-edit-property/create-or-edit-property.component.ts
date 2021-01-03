import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {
  faArrowLeft,
  faCamera,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { NgxImageCompressService } from 'ngx-image-compress';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Coords } from '../../interfaces/coords';
import { AuthService } from 'src/app/services/auth.service';
import { PropertyService } from 'src/app/services/property.service';
import { Property } from 'src/app/interfaces/property';
declare var google: any;
@Component({
  selector: 'app-create-or-edit-property',
  templateUrl: './create-or-edit-property.component.html',
  styleUrls: ['./create-or-edit-property.component.scss'],
})
export class CreateOrEditPropertyComponent implements OnInit {
  back = faArrowLeft;
  delete = faTimesCircle;
  path: any;
  faCamera = faCamera;
  images: any[] = [];
  form: FormGroup;
  coords: Coords = { latitude: 0, longitude: 0 };
  zoom: number;
  geoCoder: any;
  address: string;
  uid: string;
  loading = false;
  valid: boolean;
  amenities = [{value: 'Alberca', display: 'Alberca'}];
  newProperty: Property;
  stepeer = 'step1';
  switch = false;
  id: string;
  unmatch: boolean;
  @ViewChild('search', { static: false }) public searchElementRef: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private imageCompress: NgxImageCompressService,
    private formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private authService: AuthService,
    private propertySrv: PropertyService
  ) {}

  async ngOnInit(): Promise<void> {
    this.initForm();
    this.path = (
      await this.activatedRoute.url.pipe(first()).toPromise()
    )[0].path;
    const user = await this.authService.currentUser.pipe(first()).toPromise();
    this.uid = user.uid;
    await this.initMap();
    if (this.path === 'editar-propiedad') {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.switch = true;
      await this.initProperty();
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      area: new FormControl('', Validators.required),
      rooms: new FormControl('', Validators.required),
      baths: new FormControl(''),
      description: new FormControl('', Validators.required),
      youtubeUrl: new FormControl(''),
      price: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      typeProperty: new FormControl('', Validators.required),
      suburb: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      country: new FormControl(''),
    });
  }
  initMap(): void {
    this.mapsAPILoader.load().then(() => {
      if (this.path !== 'editar-propiedad') {
        this.setCurrentLocation();
      }
      this.geoCoder = new google.maps.Geocoder();
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: any = autocomplete.getPlace();
          console.log(place);
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.getAddress(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          ).then(() => {
            this.coords.latitude = place.geometry.location.lat();
            this.coords.longitude = place.geometry.location.lng();
            this.zoom = 18;
          });
        });
      });
    });
  }

  async initProperty(): Promise<any> {
    const property: Property = await this.propertySrv.getProperty(this.id);
    if (this.uid === property.uid) {
    this.form.controls.area.setValue(property.area);
    this.form.controls.rooms.setValue(property.rooms);
    this.form.controls.baths.setValue(property.baths);
    this.form.controls.description.setValue(property.description);
    this.form.controls.youtubeUrl.setValue(property.youtubeUrl);
    this.form.controls.price.setValue(property.price);
    this.form.controls.type.setValue(property.type);
    this.form.controls.typeProperty.setValue(property.typeProperty);
    this.form.controls.suburb.setValue(property.suburb);
    this.form.controls.city.setValue(property.city);
    this.form.controls.state.setValue(property.state);
    this.form.controls.zipCode.setValue(property.zipCode);
    this.form.controls.country.setValue(property.country);
    this.images = property.images;
    this.amenities = property.amenities;
    this.address = property.address;
    this.coords = property.coords; 
   } else {
     this.unmatch = true;
     this.router.navigate(['/usuario']);
   }
  }

  async uploadPhoto(): Promise<any> {
    const img = await this.imageCompress.uploadFile();
    const result = await this.imageCompress.compressFile(
      img.image,
      img.orientation
    );
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
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 18;
            const geocoder: any[] = results[0].address_components;
            const state = geocoder.find((address) => {
              return address.types[0] === 'administrative_area_level_1';
            });
            const city = geocoder.find((address) => {
              return address.types[0] === 'locality';
            });
            const zipcode = geocoder.find((address) => {
              return address.types[0] === 'postal_code';
            });

            const suburb = geocoder.find((address) => {
              return address.types[0] === 'sublocality_level_1';
            });

            const country = geocoder.find((address) => {
              return address.types[0] === 'country';
            });
            console.log(results[0]);

            this.form.controls.suburb.setValue(suburb?.long_name);
            this.form.controls.city.setValue(city?.long_name);
            this.form.controls.state.setValue(state?.long_name);
            this.form.controls.zipCode.setValue(zipcode?.long_name);
            this.form.controls.country.setValue('MX');
            this.address = results[0].formatted_address;
          } else {
            window.alert('No hay resultados');
          }
        } else {
          window.alert('Geocoder error: ' + status);
        }
      }
    );
  }

  markerDragEnd($event: any): void {
    this.coords.latitude = $event.latLng.lat();
    this.coords.longitude = $event.latLng.lng();
    this.getAddress(this.coords.latitude, this.coords.longitude);
  }

  async saveProperty(): Promise<void> {
    if (this.images.length > 0) {
      this.newProperty = {
        ...this.form.value,
        address: this.address,
        amenities: this.amenities,
        coords: this.coords,
        images: this.images,
        uid: this.uid,
      };
      this.loading = true;
      if (!this.switch) {
        this.stepeer = 'step2';
      } else {
        await this.propertySrv.updateProperty(this.newProperty, this.id);
        this.router.navigate(['/propiedad', this.id]);
      }
      setTimeout(() => {
        this.loading = false;
      }, 800);
    } else {
      window.alert('Debes añadir al menos una imagen');
    }
  }

  backStep(): void {
    this.loading = true;
    setTimeout(() => {
      this.stepeer = 'step1';
      this.loading = false;
    }, 350);
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1);
  }
}
