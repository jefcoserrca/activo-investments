import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  faCheck = faCheck;
  loading = false;
  recoveryForm: FormGroup;
  mailSend: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.mailSend = false;
    this.recoveryForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose(
        [ Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
      ))
    });
  }

  async recoveryPassword(): Promise<any> {
   this.loading = true;
   const res = await this.authService.recoveryPassword(this.recoveryForm.value);
   if (res) {
      this.mailSend = true;
      this.recoveryForm.reset();
    }
   this.loading = false;
  }

  resendMail(): void {
    this.mailSend = false;
  }

}
