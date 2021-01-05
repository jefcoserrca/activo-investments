import { Component, OnInit } from '@angular/core';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
declare var $: any;
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  faCoffee = faSearch;
  faBars = faBars;
  isAuth: any;
  constructor(private authService: AuthService) {
  this.authService.currentUser.subscribe( (user) => {
    this.isAuth = user;
  });
  }

  ngOnInit(): void {
    this.searcherInit();
  }

  searcherInit(): void {
    $('.navbar-toggle-box-collapse').on('click', () => {
      $('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
    });
    $('.close-box-collapse, .click-closed').on('click', () => {
      $('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
      $('.menu-list ul').slideUp(700);
    });
  }

}
