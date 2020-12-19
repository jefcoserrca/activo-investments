import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-create-or-edit-property',
  templateUrl: './create-or-edit-property.component.html',
  styleUrls: ['./create-or-edit-property.component.scss']
})
export class CreateOrEditPropertyComponent implements OnInit {
  path: any;
  faCamera = faCamera;
  images: any [] = [];

  constructor(private activatedRoute: ActivatedRoute, private imageCompress: NgxImageCompressService) {
  }

  async ngOnInit(): Promise<void> {
    this.path = ( await this.activatedRoute.url.pipe(first()).toPromise())[0].path;
    console.log(this.path);
  }

  async uploadPhoto(): Promise<any> {
    const img = await this.imageCompress.uploadFile();
    const result = await this.imageCompress.compressFile(img.image, img.orientation);
    this.images.push(result);
    console.log(result);
  }

}
