import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/interfaces/property';
import { PropertyService } from 'src/app/services/property.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { StatesAndCitiesService } from '../../services/states-and-cities.service';

@Component({
  selector: 'app-estate-list',
  templateUrl: './estate-list.component.html',
  styleUrls: ['./estate-list.component.scss'],
})
export class EstateListComponent implements OnInit {
  faExclamation = faExclamationCircle;
  properties: Array<Property> = [];
  filterProperties: Array<Property>;
  loading = true;
  type = 'todos';
  form: FormGroup;
  states: Array<any>;
  cities = [];
  keyword: string;
  state: string;
  city: string;

  constructor(
    private formBuilder: FormBuilder,
    private propertySrv: PropertyService,
    private activatedRoute: ActivatedRoute,
    private geoInfo: StatesAndCitiesService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.initForm();
    this.states = await this.geoInfo.getStates();
    this.searcher();
  }

  async searchByType(): Promise<void> {
    this.loading = true;
    this.filterProperties = await this.propertySrv.getAllProperties();
    if (this.type === 'todos') {
      this.filterProperties = [];
      this.filterProperties = this.properties;
    } else {
      this.filterProperties = this.filterProperties.filter(
        (property) => property.type === this.type
      );
    }
    this.loading = false;
  }

  searcher(): void {
    this.activatedRoute.queryParamMap
      .pipe()
      .subscribe(async (params: ParamMap) => {
        this.keyword = '';
        this.state = '';
        this.city = '';
        this.loading = true;
        this.properties = await this.propertySrv.getAllProperties();
        this.filterProperties = await this.propertySrv.getAllProperties();
        if (params.get('state')) {
          this.state = params.get('state');
          const findState = this.states.find(
            (st) => st.name === params.get('state')
          );
          this.form.controls.state.setValue(findState.id);
          await this.getByState();
          this.filterProperties = this.filterProperties.filter(
            (property) => property.state === params.get('state')
          );
        }
        if (params.get('city')) {
          this.city = params.get('city');
          this.form.controls.city.setValue(params.get('city'));
          this.filterProperties = this.filterProperties.filter(
            (property) => property.city === params.get('city')
          );
        }
        if (params.get('type')) {
          this.form.controls.type.setValue(params.get('type'));
          this.filterProperties = this.filterProperties.filter(
            (property) => property.type === params.get('type')
          );
        }
        if (params.get('typeProperty')) {
          this.form.controls.typeProperty.setValue(params.get('typeProperty'));
          this.filterProperties = this.filterProperties.filter(
            (property) => property.typeProperty === params.get('typeProperty')
          );
        }
        if (params.get('rooms')) {
          this.form.controls.rooms.setValue(params.get('rooms'));
          this.filterProperties = this.filterProperties.filter(
            (property) => property.rooms === parseInt(params.get('rooms'), 10)
          );
        }
        if (params.get('baths')) {
          this.form.controls.baths.setValue(params.get('baths'));
          this.filterProperties = this.filterProperties.filter(
            (property) => property.baths === parseInt(params.get('baths'), 10)
          );
        }

        if (params.get('keyword')) {
          const term = this.cleanString(params.get('keyword'));
          this.form.controls.keyword.setValue(params.get('keywrod'));
          this.keyword = params.get('keyword');
          this.filterProperties = this.filterProperties.filter((property) => {
            if (
              this.cleanString(property.title.toLowerCase()).indexOf(
                term.toLowerCase()
              ) > -1 ||
              this.cleanString(property.description.toLowerCase()).indexOf(
                term.toLowerCase()
              ) > -1 ||
              this.cleanString(property.address.toLowerCase()).indexOf(
                term.toLowerCase()
              ) > -1 ||
              this.cleanString(property.suburb.toLowerCase()).indexOf(
                term.toLowerCase()
              ) > -1 ||
              this.cleanString(property.city.toLowerCase()).indexOf(
                term.toLowerCase()
              ) > -1
            ) {
              return true;
            }
            return false;
          });
        }

        this.loading = false;
      });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      keyword: new FormControl(''),
      type: new FormControl(''),
      typeProperty: new FormControl(''),
      state: new FormControl(null),
      city: [{ value: '', disabled: this.cities.length > 0 ? false : true }],
      rooms: new FormControl(''),
      baths: new FormControl(''),
    });
  }

  async getByState(): Promise<any> {
    const state = this.form.value.state;
    this.cities = await this.geoInfo.getCitiesByState(state);
    this.form.get('city').enable();
  }
  search(): void {
    const query = this.form.value;
    console.log(query);
    const findState = this.states.find(
      (st) => parseInt(this.form.value.state, 10) === st.id
    );
    console.log(findState);
    query.state = findState ? findState.name : query.state;
    this.router.navigate(['/inmuebles'], { queryParams: query });
  }

  cleanString(cadena): string {
    // tslint:disable-next-line: object-literal-key-quotes
    const acentos = {
      á: 'a',
      é: 'e',
      í: 'i',
      ó: 'o',
      ú: 'u',
      Á: 'A',
      É: 'E',
      Í: 'I',
      Ó: 'O',
      Ú: 'U',
    };
    return cadena
      .split('')
      .map((letra) => acentos[letra] || letra)
      .join('')
      .toString();
  }
}
