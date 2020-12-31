import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first, map, take } from 'rxjs/operators';
import { EDonacijeResponse } from 'src/app/shared/models/e-donacije-response';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IOwlSlider } from '../models/owl-slider';
import { ISummary } from '../models/summary';
import { DashboardService } from '../services/dashboard.service'

@Component({
  selector: 'poke-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {

  /* #region  Variables */
  dashboardSlider: IOwlSlider[] = [{
    id: 1,
    icon: 'check-square',
    title: 'Total Finished',
    number: 0
  },
  {
    id: 2,
    icon: 'external-link',
    title: 'In Process',
    number: 0
  },
  {
    id: 3,
    icon: 'activity',
    title: 'Earthquakes Today',
    number: 0
  },
  {
    id: 4,
    icon: 'crop',
    title: 'Total Pictures',
    number: 0
  }];
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _dashboardService: DashboardService,
    private readonly __notificationService: NotificationService
  ) { }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    this._dashboardService.getRecentEarthquakes().pipe(first()).subscribe(
      response => { this.dashboardSlider[2].number = response }
    )
    this._dashboardService.getSummary().pipe(
      take(1),
      catchError((err) => this.catchAndReplaceError(err)),
      map(res => res.response.data)
      ).subscribe(
      (response: ISummary) => {
        this.dashboardSlider[0].number = response.finished; this.dashboardSlider[1].number = response.unfinished
      }
    )
  }

  // Error handling
  catchAndReplaceError(errorMessage: string): Observable<never> {
    this.__notificationService.fireErrorNotification(errorMessage);
    return EMPTY;
  }
  /* #endregion */

}
