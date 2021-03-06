import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ISummary } from 'src/app/components/dashboard/models/summary';
import { UrlHelperService } from 'src/app/shared/services/url-helper.service';
import { DatePipe } from '@angular/common';
import { EDonacijeResponse } from 'src/app/shared/models/e-donacije-response';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  /* #region  Variables */
  dateNow: string;
  yesterday: string;
  private readonly DASHBOARD_CONTROLLER = 'DonationRequest';
  private readonly EARTHQUAKE_API = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _urlHelper: UrlHelperService,
    private datePipe: DatePipe
  ) {
    let date = new Date();
    this.dateNow = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.yesterday = this.datePipe.transform(date.setDate(date.getDate() - 1), 'yyyy-MM-dd');
  }


  /* #region  Methods */

  // Get earthquakes
  getRecentEarthquakes(): Observable<any> {
    const url = this.EARTHQUAKE_API;
    const requestParams = this._urlHelper.getQueryParameters({
      starttime: '2020-12-25',
      endtime: this.dateNow,
      latitude: 45.3770786,
      longitude:16.3204046,
      maxradiuskm:100
    });
    return this._http
      .get<any>(url,{ params: requestParams })
      .pipe(
        tap((data) => console.log('Get past 24 hours earthquakes', data)),
        catchError(this.handleError)
      );
  }

  // total visits
  getSummary(): Observable<ISummary> {
    const url = this._urlHelper.getUrl(this.DASHBOARD_CONTROLLER,'getForDashboard');
    return this._http
      .get<ISummary>(url)
      .pipe(
        tap((data) => console.log('Get all dashboard info', data)),
        catchError(this.handleError)
      );
  }

  getTotalEarthquakes() {

  }

  // Get single
  // getOne(url: string): Observable<IPokemonDetailResponse> {
  //   return this._http
  //     .get<IPokemonDetailResponse>(url)
  //     .pipe(
  //       tap((data) => console.log('Get single pokemon', data)),
  //       catchError(this.handleError)
  //     );
  // }

  // Remove before production
  private handleError(err: HttpErrorResponse): Observable<never> {
    const { error } = err;
    // instead of logging infrastructore on BE, just log it to the console
    let errorMessage: string;
    if (error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Došlo je do frontend pogreške: ${error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }
  /* #endregion */
}
