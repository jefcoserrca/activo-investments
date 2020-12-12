import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-or-edit-property',
  templateUrl: './create-or-edit-property.component.html',
  styleUrls: ['./create-or-edit-property.component.scss']
})
export class CreateOrEditPropertyComponent implements OnInit {
  path: any;
  constructor(private activatedRoute: ActivatedRoute ) {
  }

  async ngOnInit(): Promise<void> {
    this.path = ( await this.activatedRoute.url.pipe(first()).toPromise())[0].path;
    console.log(this.path);
  }

}
