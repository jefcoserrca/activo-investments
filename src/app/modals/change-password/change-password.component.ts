import { Component, OnInit } from '@angular/core';
import { faBomb, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/must-match';
import { AuthService } from '../../services/auth.service';
declare var $: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  loading = false;
  faCheck = faCheck;
  faBomb = faBomb;
  form: FormGroup;
  passwordChange = false;
  error = false;
  constructor(private formBuilder: FormBuilder, private authSrv: AuthService) { }

  ngOnInit(): void {
   this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: MustMatch('newPassword', 'confirmPassword')});
  }

  async changePassword(): Promise<void> {
    if ( this.form.valid ) {
      this.error = false;
      this.loading = true;
      const res = await this.authSrv.changePassword(this.form.value).catch((e) => {
        this.error = true;
      });
      if (res) {
        this.passwordChange = true;
        this.form.reset();
      }
      this.loading = false;
    }
  }

  back(): void {
    $('#changePasswordModal').modal('hide');
  }

}
