import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UrlHelperService } from 'src/app/shared/services/url-helper.service';
import { IApplicationAddress } from '../models/request/application-address';
import { IApplicationMap } from '../models/request/application-map';


@Injectable({
  providedIn: 'root',
})
export class ApplicationWizardService {
  /* #region  Variables */
  private readonly TICKER_CONTROLLER = 'contact';
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _urlHelper: UrlHelperService
  ) { }
  /* #endregion */

  /* #region  Methods */

  // Post contact form
  sendAddress(formValues: IApplicationAddress): Observable<any> {
    const url = this._urlHelper.getUrl(this.TICKER_CONTROLLER);
    const request = {...formValues}
    return this._http
      .post<any>(url, request)
      .pipe(
        tap((data) => console.log('Post address step', data)),
        catchError(this.handleError)
      );
  }

  // Send marker lang & lat
  sendLocation(values): Observable<any> {
    const url = this._urlHelper.getUrl(this.TICKER_CONTROLLER);
    const request: IApplicationMap = {...values};
    return this._http
      .post<any>(url, request)
      .pipe(
        tap((data) => console.log('Post map step', data)),
        catchError(this.handleError)
      );
  }

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
