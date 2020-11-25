import { Component, OnInit } from '@angular/core';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  faCoffee = faSearch;
  faBars = faBars;

  constructor() { }

  ngOnInit(): void {
  }

}
