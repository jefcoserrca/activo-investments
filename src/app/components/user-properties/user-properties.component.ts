import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user-properties',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.scss']
})
export class UserPropertiesComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faExclamation = faExclamationCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
