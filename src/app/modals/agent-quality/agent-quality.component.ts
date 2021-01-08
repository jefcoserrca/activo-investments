import { Component, Input, OnInit } from '@angular/core';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserDataService } from '../../services/user-data.service';
declare var $;
@Component({
  selector: 'app-agent-quality',
  templateUrl: './agent-quality.component.html',
  styleUrls: ['./agent-quality.component.scss']
})
export class AgentQualityComponent implements OnInit {
  loading = false;
  faBomb = faBomb;
  error = false;
  stars = 0;
  message = '';
  showMessage = false;
  @Input() uid: string;
  constructor(
    private userData: UserDataService
  ) {
   }

  ngOnInit(): void {
  }

 async sendQualify(): Promise<void> {
   this.error = false;
   this.loading = true;
   await this.userData.setQualify(this.uid, { stars: this.stars, message: this.message }).catch((e) => {
     this.loading = false;
     this.error = true;
   });
   this.showMessage = true;
   this.loading = false;
   setTimeout(() => {
   $('#qualifyAgentModal').modal('hide');
   this.stars = 0;
   this.message = '';
   this.showMessage = false;
   }, 3000);
  }

}
