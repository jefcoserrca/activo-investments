import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { faBomb, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { first } from 'rxjs/operators';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';
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
  @Input() user: User;
  userId: string;
  constructor(
    private authSrv: AuthService,
    private userData: UserDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
   }

  async ngOnInit(): Promise<void> {
    this.initForm();
    this.userId = (await this.authSrv.currentUser.pipe( first() ).toPromise()).uid;
    this.user = await this.userData.getUser(this.userId);
    this.form.controls.name.setValue(this.user.name);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(this.user?.name, Validators.required),
    });

  }

  async editProfile(): Promise <any> {
    this.error = false;
    if ( this.form.valid) {
      this.loading = true;
      const res = await this.userData.updateUser(this.userId , this.form.value).catch( (e) => this.error = true);
      if (res) {
        this.confirmEdit = true;
        this.router.navigateByUrl('/usuario');
      }
      this.loading = false;
    }
  }

}
