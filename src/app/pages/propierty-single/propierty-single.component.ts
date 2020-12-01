import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-propierty-single',
  templateUrl: './propierty-single.component.html',
  styleUrls: ['./propierty-single.component.scss']
})
export class PropiertySingleComponent implements OnInit {
  left = faArrowLeft;
  rigth = faArrowRight;

   optionsCarousel: OwlOptions = {
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    navText: ['<', '>'],
    items: 1,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
