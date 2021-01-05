import { Component, OnInit } from '@angular/core';
import { StatesAndCitiesService } from '../../services/states-and-cities.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
declare var $;
@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {
  states: Array<any>;
  cities = [];
  form: FormGroup;
  faClose = faTimesCircle;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private geoInfo: StatesAndCitiesService
  ) { }

  async ngOnInit(): Promise<any> {
    this.initForm();
    this.states = await this.geoInfo.getStates();
    console.log(this.states);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      keyword: new FormControl(''),
      type: new FormControl(''),
      typeProperty: new FormControl(''),
      state: new FormControl(null),
      city: [{value: '', disabled: this.cities.length > 0 ? false : true}],
      rooms: new FormControl(''),
      baths: new FormControl (''),
    });
  }

  async getByState(): Promise<any> {
    const state = this.form.value.state;
    this.cities = await this.geoInfo.getCitiesByState(state);
    this.form.get('city').enable();
  }

  search(): void {
    const query = this.form.value;
    const findState = this.states.find((st) => parseInt(this.form.value.state, 10) === st.id );
    console.log(findState);
    query.state = findState ? findState.name : query.state;
    this.router.navigate(['/inmuebles'], {queryParams: query});
    $('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
  }

}
