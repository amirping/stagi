import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { StageService } from '@app/core/http/stage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  stages: Array<any> | undefined;
  isLoading = false;

  constructor(private quoteService: QuoteService, private stagesService: StageService) {}

  ngOnInit() {
    this.isLoading = true;
    // this.quoteService
    //   .getRandomQuote({ category: 'dev' })
    //   .pipe(
    //     finalize(() => {
    //       this.isLoading = false;
    //     })
    //   )
    //   .subscribe((quote: string) => {
    //     this.quote = quote;
    //   });
    this.isLoading = true;
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
  }
}
