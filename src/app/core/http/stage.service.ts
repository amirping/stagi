import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  postulerStage(idStage: string | any, idUser: any, postulationData: any, token: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('files.cv', postulationData.cv, postulationData.cv.name);
    const data = {
      motivation: postulationData.motivation || '',
      user: idUser,
      stage: idStage
    };
    formData.append('data', JSON.stringify(data));
    return this.httpClient
      .post(this.baseUrl + 'stage-requests', formData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load stages :-('))
      );
  }

  getStagesByUser(username: string): Observable<Array<any>> {
    return this.httpClient
      .cache()
      .get(this.backUrl)
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load stages :-('))
      );
  }
}
