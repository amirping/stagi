import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { QuoteService } from './quote.service';
import { StageService } from '@app/core/http/stage.service';
import { CredentialsService } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  stages: Array<any> | undefined;
  isLoading = false;
  isAuth = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  filterData = {
    durations: [] as Array<any>,
    locations: [] as Array<any>,
    stagesTypes: [] as Array<any>,
    levels: [] as Array<any>
  };
  filter = {
    durationMin: '',
    durationMax: '',
    technologies: [] as Array<any>,
    level: Number,
    location: String,
    title: '',
    typeStage: Number
  };
  constructor(
    private quoteService: QuoteService,
    private stagesService: StageService,
    private creed: CredentialsService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.filterData.durations = [];
    this.filterData.locations = [
      'Ariana',
      'Beja',
      'Ben_Arous',
      'Bizerte',
      'Gabes',
      'Gafsa',
      'Jendouba',
      'Kairouan',
      'Kasserine',
      'Kebili',
      'Kef',
      'Mahdia',
      'Manouba',
      'Medenine',
      'Monastir',
      'Nabeul',
      'Sfax',
      'Sidi_Bouzid',
      'Siliana',
      'Sousse',
      'Tataouine',
      'Tozeur',
      'Tunis',
      'Zaghouan'
    ];
    this.filterData.stagesTypes = [];
    this.filterData.levels = [];
    this.filter.title = '';
    this.isAuth = this.creed.isAuthenticated();

    this.stagesService
      .getStages()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((_stages: Array<any>) => {
        console.log(_stages);
        this.stages = _stages;
      });
    this.isLoading = true;
    this.stagesService
      .getStagesTypes()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((_stagestypes: Array<any>) => {
        this.filterData.stagesTypes = _stagestypes;
      });

    this.stagesService
      .getStagesLevels()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((_stageslevels: Array<any>) => {
        this.filterData.levels = _stageslevels;
      });
  }
  clearString(s: string) {
    return s
      .replace(/\#/g, '')
      .replace(/\*/g, '')
      .substring(1, 250);
  }
}
