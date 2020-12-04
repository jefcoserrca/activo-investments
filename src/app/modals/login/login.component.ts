import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {  faFacebookF  } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fbIncon = faFacebookF;
  loginForm: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
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

  loginEmailAndPassword(): Promise<any> {
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      console.log('si jala');
    }
    return;
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
      this.loading = false;
    }
  }

}
