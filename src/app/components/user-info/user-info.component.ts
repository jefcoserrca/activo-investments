import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { User, BillingInfo } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { faCheck, faBomb } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  form: FormGroup;
  loading = false;
  error = false;
  confirm = false;
  userId: string;
  user: User;
  faCheck = faCheck;
  faBomb = faBomb;

  constructor(
    private formBuilder: FormBuilder,
    private userData: UserDataService,
    private authSrv: AuthService
  ) { }

  async ngOnInit(): Promise <void> {
    this.initForm();
    this.userId = (await this.authSrv.currentUser.pipe( first() ).toPromise()).uid;
    await this.validData();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      RFC: new FormControl('', Validators.required),
      businessName: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      suburb: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(5)
      ])),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  async validData(): Promise<any> {
    this.user = await this.userData.getUser(this.userId);
    if (this.user.billingInfo) {
      this.form.setValue({
        name: this.user.billingInfo.name,
        email: this.user.billingInfo.email,
        RFC: this.user.billingInfo.RFC,
        businessName: this.user.billingInfo.businessName,
        street: this.user.billingInfo.street,
        suburb: this.user.billingInfo.suburb,
        zipCode: this.user.billingInfo.zipCode,
        city: this.user.billingInfo.city,
        country: this.user.billingInfo.country
      });
    }
  }

  async saveChanges(): Promise <any> {
    this.error = false;
    if ( this.form.valid) {
      this.loading = true;
      const billingInfo: any = { billingInfo: this.form.value };
      const res = await this.userData.updateUser(this.userId , billingInfo).catch( (e) => this.error = true);
      if (res) {
        this.confirm = true;
        setTimeout(() => {
          this.confirm = false;
        }, 1500);
      }
      this.loading = false;
    }
  }


}
