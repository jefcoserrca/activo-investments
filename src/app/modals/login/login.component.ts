import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {  faFacebookF  } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fbIncon = faFacebookF;
  loginForm: FormGroup;
  loading = false;
  error: any;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose(
       [ Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
      )),
      password: new FormControl('', Validators.required),
    });
  }

  async loginEmailAndPassword(): Promise<any> {
    this.loading = true;
    if (this.loginForm.valid) {
      try {
        await this.authService.loginWithEmail(this.loginForm.value);
        $('#loginModal').modal('hide');
        await this.navigate();
      } catch (e) {
        this.error = e.message;
      }
      this.loading = false;
    }
  }

  async loginWithFacebook(): Promise<void> {
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
      $('#loginModal').modal('hide');
      await this.navigate();
      this.loading = false;
    }
  }

  passwordRecovery(): void {
    $('#loginModal').modal('hide');
    $('#recoveryModal').modal('show');
  }

  async navigate(): Promise<void> {
    await this.router.navigateByUrl('/usuario');
  }


}
