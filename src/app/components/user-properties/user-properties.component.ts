import { Component, Input, OnInit } from '@angular/core';
import { faEdit, faTrash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs/operators';
import { Property } from 'src/app/interfaces/property';
import { AuthService } from 'src/app/services/auth.service';
import { PropertyService } from 'src/app/services/property.service';
declare var $;
@Component({
  selector: 'app-user-properties',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.scss']
})
export class UserPropertiesComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faExclamation = faExclamationCircle;
  userId: string;
  properties: Array <Property>;
  loading = true;
  index: number;
  @Input() adminMode: boolean;
  constructor(
    private authSrv: AuthService,
    private propertySrv: PropertyService,
  ) { }

  async ngOnInit(): Promise<void> {
   this.loading = true;
   this.userId = (await this.authSrv.currentUser.pipe( first() ).toPromise()).uid;
   this.properties = this.adminMode ? await this.propertySrv.getAllProperties() : await this.propertySrv.getPropertiesByOwner(this.userId);
   console.log(this.properties);
   this.loading = false;
  }

  selectItem(index: number): void {
    console.log(index);
    this.index = index;
  }

  cancel(): void {
    $('#deleteModal').modal('hide');
  }

  async delete(): Promise<any> {
    this.loading = true;
    const property = this.properties[this.index];
    await this.propertySrv.deleteProperty(property.id);
    this.properties = this.adminMode ? await this.propertySrv.getAllProperties() : await this.propertySrv.getPropertiesByOwner(this.userId);
    this.cancel();
    this.loading = false;
  }

}
