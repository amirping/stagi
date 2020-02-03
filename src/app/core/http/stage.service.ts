import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  backUrl = 'http://localhost:1337/stages';

  constructor(private httpClient: HttpClient) {}

  getStages(): Observable<Array<any>> {
    return this.httpClient
      .cache()
      .get(this.backUrl)
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load stages :-('))
      );
  }
}
