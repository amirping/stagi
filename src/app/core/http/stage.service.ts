import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  backUrl = 'http://localhost:1337/stages';
  baseUrl = 'http://localhost:1337/';

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

  getStage(id: string | any): Observable<any> {
    return this.httpClient
      .cache()
      .get(this.backUrl + '/' + id)
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load stages :-('))
      );
  }

  getStagesTypes(): Observable<Array<any>> {
    return this.httpClient
      .cache()
      .get(this.baseUrl + 'stage-types')
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load stages types :-('))
      );
  }

  getStagesLevels(): Observable<Array<any>> {
    return this.httpClient
      .cache()
      .get(this.baseUrl + 'levels')
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load stages levels :-('))
      );
  }

  postulerStage(idStage: string | any, idUser: string | any): Observable<any> {
    return this.httpClient
      .cache()
      .get(this.baseUrl + '/')
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load stages :-('))
      );
  }
}
