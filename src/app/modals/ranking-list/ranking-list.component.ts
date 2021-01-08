import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.scss']
})
export class RankingListComponent implements OnInit {
  loading = true;
  faStar = faStar;
  @Input() uid: string;
  opinions: Array<any>;
  stars: number;
  constructor(
    private userData: UserDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    console.log('coño', this.uid);
    const res = await this.userData.getOpinions(this.uid);
    this.opinions = res.opinions;
    this.stars = res.stars;
    this.loading = false;
  }

}
