import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  faFacebookF  } from '@fortawesome/free-brands-svg-icons';
import { MustMatch } from '../../helpers/must-match';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  fbIncon = faFacebookF;
  signupForm: FormGroup;
  loading = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    }, { validator: MustMatch('password', 'confirmPassword') });
  }

  async createUser(): Promise<void> {
    this.loading = true;
    if (this.signupForm.valid) {
       const res = await this.authService.createUser(this.signupForm.value);
       console.log(res);
       if (res) {
         $('#signupModal').modal('hide');
         await this.navigate();
       }
       this.loading = false;
    }
  }

  async registerWithFacebook(): Promise<void> {
    this.loading = true;
    const credential = await this.authService.FacebookAuth();
    if (credential) {

      const newUser: User = {
        name: credential.user.displayName,
        email: credential.user.email,
        role: 'client',
        imgProfile: credential.user.photoURL
      };

      await this.authService.saveData(newUser, credential.user.uid);
      $('#signupModal').modal('hide');
      await this.navigate();
      this.loading = false;
    }
  }

  async navigate(): Promise<void> {
    await this.router.navigateByUrl('/usuario');
  }

}
