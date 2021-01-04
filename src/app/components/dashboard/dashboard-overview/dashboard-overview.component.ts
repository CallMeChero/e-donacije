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
import { AdvancedLayout, Image, ButtonEvent, ButtonsConfig, ButtonsStrategy, KS_DEFAULT_BTN_CLOSE, KS_DEFAULT_BTN_DOWNLOAD, PlainGalleryConfig, PlainGalleryStrategy } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {

  /* #region  Variables */
  dashboardSlider: IOwlSlider[] = [
  {
    id: 1,
    icon: 'external-link',
    title: 'In Process',
    number: 0
  },
  {
    id: 2,
    icon: 'activity',
    title: 'Earthquakes Today',
    number: 0
  },
  {
    id: 3,
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
    this.getEarthquakeData();
    this.getSummaryData()
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

  getEarthquakeData() {
    this._dashboardService.getRecentEarthquakes().pipe(
      first()
    ).subscribe(
      response => {
        this.dashboardSlider[1].number = response.metadata?.count ?? 0;
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
  }

  getSummaryData():void {
    this._dashboardService.getSummary().pipe(
      take(1)
    ).subscribe(
      (response: ISummary) => {
        this.dashboardSlider[0].number = response.requests;
        this.dashboardSlider[2].number = response.images;
      }
    )
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

  /* #region  Gallery */
  owlcarousel14Options = {
    items: 1,
    margin: 10,
    autoHeight: true,
    nav: false
  }

  customPlainGalleryRowDescConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  owlcarousel1 = [
    { id: 0, img: "assets/images/dashboard/3.jpg" },
    { id: 1,img: "assets/images/dashboard/1.jpg" },
    { id: 2, img: "assets/images/dashboard/2.jpg" },
    { id: 3, img: "assets/images/dashboard/4.jpg" },
    { id: 4, img: "assets/images/dashboard/5.jpg" },
    { id: 5, img: "assets/images/dashboard/6.jpg" },
    { id: 6, img: "assets/images/dashboard/7.jpg" },
    { id: 7, img: "assets/images/dashboard/8.jpg" },
    { id: 8, img: "assets/images/dashboard/9.jpg" },
  ];

  imagesRect: Image[] = [
    new Image(
      0,
      { // modal
        img: this.owlcarousel1[0].img,
        extUrl: 'http://www.google.com',
        description: 'Image Caption 3'
      },
      {
        img: this.owlcarousel1[0].img,
      }
    ),
    new Image(
      1,
      { // modal
        img: this.owlcarousel1[1].img,
        extUrl: 'http://www.google.com',
        description: 'Image Caption 1'
      }, {
        img: this.owlcarousel1[1].img,
      }
    ),
    new Image(
      2,
      { // modal
        img: this.owlcarousel1[2].img,
        extUrl: 'http://www.google.com',
        description: 'Image Caption 2'
      }, {
        img: this.owlcarousel1[2].img,
      }
    ),
    new Image(
      3,
      { // modal
        img: this.owlcarousel1[3].img,
        extUrl: 'http://www.google.com',
        description: 'Image Caption 4'
      },
      {
        img: this.owlcarousel1[3].img,
      }
    ),
    new Image(
      4,
      { // modal
        img: this.owlcarousel1[4].img,
        extUrl: 'http://www.google.com',
        description: 'Image Caption 5'
      },
      {
        img: this.owlcarousel1[4].img,
      }
    ),
    new Image(
      5,
      { // modal
        img: this.owlcarousel1[5].img,
        extUrl: 'http://www.google.com',
        description: 'Image Caption 6'
      },
      {
        img: this.owlcarousel1[5].img,
      }
    ),
    new Image(
      6,
      { // modal
        img: this.owlcarousel1[6].img,
        extUrl: 'http://www.google.com',
        description: 'Image Caption 7'
      },
      {
        img: this.owlcarousel1[6].img,
      }
    ),
    new Image(
      7,
      { // modal
        img: this.owlcarousel1[7].img,
        extUrl: 'http://www.google.com',
        description: 'Image Caption 8'
      },
      {
        img: this.owlcarousel1[7].img,
      }
    ),
    new Image(
      8,
      { // modal
        img: this.owlcarousel1[8].img,
        extUrl: 'http://www.google.com',
        description: 'Image Caption 9'
      },
      {
        img: this.owlcarousel1[8].img,
      }
    )];

  buttonsConfigCustom: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.CUSTOM,
    buttons: [
      KS_DEFAULT_BTN_DOWNLOAD,
      KS_DEFAULT_BTN_CLOSE
    ]
  };

  onButtonBeforeHook(event: ButtonEvent) {
    if (!event || !event.button) {
      return;
    }
  }

  onButtonAfterHook(event: ButtonEvent) {
    if (!event || !event.button) {
      return;
    }
  }

  openImageModalRowDescription() {
    const index: number = 0;
    this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(index, true) });
  }
  /* #endregion */

}
