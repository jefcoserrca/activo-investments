import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAsterisk, faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  faUserEdit = faUserEdit;
  faAsterisk = faAsterisk;
  faSingOut = faSignOutAlt;
  userId: string;
  user: User;
  constructor(
    private authSrv: AuthService,
    private userData: UserDataService,
    private route: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.userId = (await this.authSrv.currentUser.pipe( first() ).toPromise()).uid;
    this.user = await this.userData.getUser(this.userId);
    this.user.imgProfile = this.user.imgProfile ? this.user.imgProfile : this.user.imgProfile ? this.user.imgProfile : 'https://www.americanaircraftsales.com/wp-content/uploads/2016/09/no-profile-img-294x300.jpg';

  }

  async logout(): Promise<void> {
    const res = await this.authSrv.logout();
    if (res) {
      this.route.navigateByUrl('/home');
    }
  }

}
