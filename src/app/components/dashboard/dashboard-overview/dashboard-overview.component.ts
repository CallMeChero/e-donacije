import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first, map, take } from 'rxjs/operators';
import { EDonacijeResponse } from 'src/app/shared/models/e-donacije-response';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IOwlSlider } from '../models/owl-slider';
import { ISummary } from '../models/summary';
import { DashboardService } from '../services/dashboard.service'
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { CRO_COLUMS, ENG_COLUMNS } from '../models/consts/datatable-column';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard-overview',
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
  earthquakeRows: any[] = [];
  earthquakes: any[] = [];
  columns: any[] = [];
  currentLang: string;

  maxBounds = L.latLngBounds(
    L.latLng(42.35295, 13.518828),
    L.latLng(46.55597, 19.40382)
  );

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 25],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "assets/images/map/star.png",
      // shadowUrl: "assets/images/map/marker-shadow.png"
    })
  };

  map: L.Map;
  //map
  mapOptions = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '...'
      })
    ],
    zoom: 11,
    center: L.latLng(45.440556, 16.278333)
  };
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _dashboardService: DashboardService,
    private readonly __notificationService: NotificationService,
    private readonly _translateService: TranslateService
  ) {
    this.currentLang = this._translateService.currentLang;
    this._translateService.currentLang === 'hr' ? this.columns = CRO_COLUMS : ENG_COLUMNS;
  }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    this._dashboardService.getRecentEarthquakes().pipe(
      first()
    ).subscribe(
      response => {
        this.dashboardSlider[2].number = response.metadata?.count ?? 0;
        if(response?.features) {
          const res = response.features;
          res.forEach(
            el => {
              this.initMarkers(el);
              this.earthquakes.push(el);
              this.earthquakeRows.push({
                mag: el.properties.mag,
                place: el.properties.place,
                time: moment(el.properties.time).format("DD.MM.YYYY HH:mm:ss")
              });
              this.earthquakeRows = [...this.earthquakeRows];
            }
          )
        }
      }
    )
    // this._dashboardService.getSummary().pipe(
    //   take(1),
    //   map(res => res.response.data)
    //   ).subscribe(
    //   (response: ISummary) => {
    //     this.dashboardSlider[0].number = response.finished; this.dashboardSlider[1].number = response.unfinished
    //   }
    // )
    this.watchForLangChange();
  }

  watchForLangChange() {
    this._translateService.onLangChange.subscribe(response => {
      if(response?.lang) {
        this.currentLang = response.lang;
        this.columns = this.currentLang ? CRO_COLUMS : ENG_COLUMNS;
        this.map.eachLayer(
          item => {
            if (item instanceof L.Marker){
              this.map.removeLayer(item);
            }
          }
        );
        setTimeout(() => { this.earthquakes.forEach(el => {
          this.initMarkers(el);
        })},100)
      }
    });
  }

  onMapReady(map: L.Map): void {
    map.setMaxBounds(this.maxBounds);
    map.setMaxZoom(18);
    map.setMinZoom(8);
    this.map = map;
  }

  initMarkers(el): void {
    const popupInfo = `<div>
    <h5><strong>${ this.currentLang == 'hr' ? 'Vrijeme' : 'Time' }:</strong> ${ this.currentLang == 'hr' ? moment(el.properties.time).format("DD.MM.YYYY HH:mm:ss") : moment(el.properties.time).format("MM.DD.YYYY HH:mm:ss")}</h5></div>
    <div>
    <h5><strong>${ this.currentLang == 'hr' ? 'Jačina' : 'Magnitude' }:</strong>  ${ el.properties.mag }</b>
    </div>`;
    L.marker([el.geometry.coordinates[1],el.geometry.coordinates[0]], this.markerIcon)
      .addTo(this.map)
      .bindPopup(popupInfo);
  }
  /* #endregion */

}
