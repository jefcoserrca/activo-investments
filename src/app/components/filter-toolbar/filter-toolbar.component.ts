import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { StatesAndCitiesService } from '../../services/states-and-cities.service';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.scss'],
})
export class FilterToolbarComponent implements OnInit {
  form: FormGroup;
  states: Array<any>;
  cities = [];
  constructor(
    private formBuilder: FormBuilder,
    private geoInfo: StatesAndCitiesService,
    private router: Router) {}

    async ngOnInit(): Promise<void> {
    this.init();
    this.initForm();
    this.states = await this.geoInfo.getStates();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      type: new FormControl(''),
      typeProperty: new FormControl(''),
      state: new FormControl(null),
      city: [{value: '', disabled: this.cities.length > 0 ? false : true}],
      rooms: new FormControl(''),
      baths: new FormControl (''),
    });
  }
  init(): void {
    $(document).ready(() => {
      $('.filter-dropdown, .text-button').click(() => {
        $('.edit-filter-modal').toggleClass('hidden');
      });
      $('.apply-button').click(() => {
        $('.edit-filter-modal').toggleClass('hidden');
        $('.filter, .filter-remove, .fa-plus, .fa-filter').toggleClass(
          'filter-hidden'
        );
        $('.filter-dropdown-text').text('Add filter');
      });

      $('.filter-remove').click(() => {
        $('.filter, .filter-remove, .fa-plus, .fa-filter').toggleClass(
          'filter-hidden'
        );
        $('.filter-dropdown-text').text('Filter dataset');
      });
    });
  }

  search(): void {
    const query = this.form.value;
    console.log(query);
    const findState = this.states.find((st) => parseInt(this.form.value.state, 10) === st.id );
    console.log(findState);
    query.state = findState ? findState.name : query.state;
    this.router.navigate(['/inmuebles'], {queryParams: query});
  }
}
