import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SentenceService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public getEachSentence(sentenceNo: number): Observable<any> {
    let url = `https://api.hatchways.io/assessment/sentences/${sentenceNo}`;
    return this.http
      .get(url, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError));
  }
}
