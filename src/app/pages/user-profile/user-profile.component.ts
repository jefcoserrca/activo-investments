import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faAsterisk,
  faSignOutAlt,
  faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../interfaces/user';
import { PropertyService } from '../../services/property.service';
import { ConfigService } from '../../services/config.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  faUserEdit = faUserEdit;
  faAsterisk = faAsterisk;
  faSingOut = faSignOutAlt;
  userId: string;
  user: User;
  adminMode = false;
  autocomplete: any[];
  banner: any[];
  newness: any[];
  recommendations: any[];
  loading: boolean;
  allProperties: any [];
  message = false;
  constructor(
    private authSrv: AuthService,
    private propertySrv: PropertyService,
    private configSrv: ConfigService,
    private userData: UserDataService,
    private route: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId = (
      await this.authSrv.currentUser.pipe(first()).toPromise()
    ).uid;
    this.user = await this.userData.getUser(this.userId);
    this.adminMode = this.user.role === 'admin' ? true : false;
    if (this.adminMode) {
      await this.getPropierties();
      await this.initAdminHome();
    }
    this.user.imgProfile = this.user.imgProfile
      ? this.user.imgProfile
      : this.user.imgProfile
      ? this.user.imgProfile
      : 'https://www.americanaircraftsales.com/wp-content/uploads/2016/09/no-profile-img-294x300.jpg';
  }

  async logout(): Promise<void> {
    const res = await this.authSrv.logout();
    if (res) {
      this.route.navigateByUrl('/home');
    }
  }

  async getPropierties(): Promise<any> {
    this.allProperties = await this.propertySrv.getAllProperties();
    this.autocomplete = this.allProperties.map((property) => {
      return { value: property.id, display: property.address };
    });
  }

  async updateHome(): Promise<any> {
    this.loading = true;
    this.message = false;
    const bannerProperties = this.allProperties.filter((property) => this.banner.some( (item) => property.id === item.value ));
    const recommProperties = this.allProperties.filter((property) => this.recommendations.some( (item) => property.id === item.value ));
    const data = {
      banner: bannerProperties,
      recommendations: recommProperties
    };
    await this.configSrv.updateConfig(data);
    this.loading = false;
    this.message = true;
    setTimeout(() => {
      this.message = false;
    },  3000);
  }

  async initAdminHome(): Promise<any> {
    const res = await this.configSrv.getConfig();
    this.recommendations = res.recommendations.map((property) => {
      return { value: property.id, display: property.address };
    });
    this.banner = res.banner.map((property) => {
      return { value: property.id, display: property.address };
    });
  }
}
