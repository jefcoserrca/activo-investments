import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../../interfaces/property';

@Component({
  selector: 'app-square-card',
  templateUrl: './square-card.component.html',
  styleUrls: ['./square-card.component.scss']
})
export class SquareCardComponent implements OnInit {
  @Input() property: Property;
  constructor() { }

  ngOnInit(): void {
  }

}
