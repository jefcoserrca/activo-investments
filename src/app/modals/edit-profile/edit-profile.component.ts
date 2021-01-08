import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { faBomb, faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { first } from 'rxjs/operators';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  error = false;
  loading = false;
  confirmEdit = false;
  form: FormGroup;
  faBomb = faBomb;
  faCheck = faCheck;
  faPhoto = faCamera;
  @Input() user: User;
  userId: string;
  constructor(
    private authSrv: AuthService,
    private userData: UserDataService,
    private formBuilder: FormBuilder,
    private imageCompress: NgxImageCompressService,
    private router: Router
  ) {
   }

  async ngOnInit(): Promise<void> {
    this.initForm();
    this.userId = (await this.authSrv.currentUser.pipe( first() ).toPromise()).uid;
    this.user = await this.userData.getUser(this.userId);
    this.form.controls.name.setValue(this.user.name);
    this.form.controls.description.setValue(this.user.description);
    this.form.controls.phone.setValue(this.user.phone);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(this.user?.name, Validators.required),
      description: new FormControl(this.user?.description, Validators.required),
      phone: new FormControl('', Validators.required),
      imgProfile: new FormControl('')
    });

  }

  async editProfile(): Promise <any> {
    this.error = false;
    if ( this.form.valid) {
      this.loading = true;
      this.form.value.imgProfile = this.user.imgProfile ? this.user.imgProfile : 'https://www.americanaircraftsales.com/wp-content/uploads/2016/09/no-profile-img-294x300.jpg';
      const res = await this.userData.updateUser(this.userId , this.form.value).catch( (e) => console.log(e));
      if (res) {
        this.confirmEdit = true;
        this.router.navigate(['/usuario']);
      }
      this.loading = false;
      setTimeout(() => {
        this.confirmEdit = false;
      }, 3000);
    }
  }

  async uploadPhoto(): Promise<any> {
    const img = await this.imageCompress.uploadFile();
    const result = await this.imageCompress.compressFile(
      img.image,
      img.orientation,
      100,
      100
    );
    this.user.imgProfile = result;
  }

}
