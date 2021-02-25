import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  @Input() content: any;
  loading = true;
  constructor(
    private config: ConfigService
  ) { }

  async ngOnInit(): Promise<void> {
    this.content = await this.config.getConfigAboutUs();
    this.loading = false;
  }

}
