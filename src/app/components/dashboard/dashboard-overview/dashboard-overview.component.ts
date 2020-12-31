import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IOwlSlider } from '../models/owl-slider';
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
    private readonly _dashboardService: DashboardService
  ) { }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    this._dashboardService.getRecentEarthquakes().pipe(first()).subscribe(
      response => { this.dashboardSlider[2].number = response }
    )
    this._dashboardService.getSummary().pipe(first()).subscribe(
      response => { this.dashboardSlider[0].number = response.finished; this.dashboardSlider[1].number = response.unfinished }
    )
  }
  /* #endregion */

}
