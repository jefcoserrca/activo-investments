import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/interfaces/property';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-estate-list',
  templateUrl: './estate-list.component.html',
  styleUrls: ['./estate-list.component.scss']
})
export class EstateListComponent implements OnInit {
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

  searchByType(): void {
    console.log(this.type);
    if(this.type === 'todos'){
      this.filterProperties = [];
      this.filterProperties = this.properties;
    }else{
    this.filterProperties = this.filterProperties.filter( (property) => property.type === this.type );
    }
  }

}
