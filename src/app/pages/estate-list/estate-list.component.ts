import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/interfaces/property';
import { PropertyService } from 'src/app/services/property.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-estate-list',
  templateUrl: './estate-list.component.html',
  styleUrls: ['./estate-list.component.scss']
})
export class EstateListComponent implements OnInit {
  faExclamation = faExclamationCircle;
  properties: Array<Property> = [];
  filterProperties: Array<Property>;
  loading = true;
  type = 'todos';
  constructor(
    private propertySrv: PropertyService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.properties = await this.propertySrv.getAllProperties();
    this.filterProperties = await this.propertySrv.getAllProperties();
    this.loading = false;
    console.log(this.properties);
  }

  async searchByType(): Promise <void> {
    console.log(this.type);
    this.loading = true;
    this.filterProperties = await this.propertySrv.getAllProperties();
    if(this.type === 'todos'){
      this.filterProperties = [];
      this.filterProperties = this.properties;
    }else{
    this.filterProperties = this.filterProperties.filter( (property) => property.type === this.type );
    }
    this.loading = false;
  }

}
