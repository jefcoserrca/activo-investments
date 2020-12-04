import { Component, OnInit } from '@angular/core';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  faCoffee = faSearch;
  faBars = faBars;
  isAuth: boolean;
  constructor(private authService: AuthService) {
   this.isAuth = this.authService.authenticated.valueOf();
   console.log(this.isAuth);
  }

  ngOnInit(): void {
  }

}
