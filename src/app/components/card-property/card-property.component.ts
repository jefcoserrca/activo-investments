import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-card-property',
  templateUrl: './card-property.component.html',
  styleUrls: ['./card-property.component.scss']
})
export class CardPropertyComponent implements OnInit {
  @Input() property: Property;
  constructor() { }

  ngOnInit(): void {
  }

}
