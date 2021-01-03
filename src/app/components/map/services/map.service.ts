import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UrlHelperService } from 'src/app/shared/services/url-helper.service';
import { IMapLatitudeLongitude } from 'src/app/components/map/models/response/map-latitude-longitude';

@Injectable({
  providedIn: 'root',
})
export class MapService {

  /* #region  Variables */
  dateNow: string;
  yesterday: string;
  private readonly MAP_CONTROLLER = 'DonationRequest';
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _urlHelper: UrlHelperService
  ) { }

  /* #region  Methods */
  getAllLocations(): Observable<IMapLatitudeLongitude[]> {
    const url = this._urlHelper.getUrl(this.MAP_CONTROLLER, 'getAllLocations');
    return this._http
      .get<IMapLatitudeLongitude[]>(url)
      .pipe(
        tap((data) => console.log('Get all markers', data))
      );
  }

  getSingleLocationDetail(id: number): Observable<any> {
    const url = this._urlHelper.getUrl(this.MAP_CONTROLLER, 'requestDetails', id.toString());
    return this._http
      .get<any>(url)
      .pipe(
        tap((data) => console.log('Get detail for marker', data))
      );
  }
  /* #endregion */
}
