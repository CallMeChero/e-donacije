import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../services/map.service';
import { take } from 'rxjs/operators';
import { IMapLatitudeLongitude } from '../models/response/map-latitude-longitude';
import { TranslateService } from '@ngx-translate/core';
import { MapDetailDetermintator } from '../services/determinators/map-detail.determinator';
import { AdvancedLayout, PlainGalleryConfig, PlainGalleryStrategy, Image, ButtonsConfig, ButtonsStrategy, KS_DEFAULT_BTN_FULL_SCREEN, KS_DEFAULT_BTN_DOWNLOAD, KS_DEFAULT_BTN_CLOSE, ButtonEvent } from '@ks89/angular-modal-gallery';
import { responsivePopup } from 'leaflet-responsive-popup';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-map-overview',
  templateUrl: './map-overview.component.html',
  styleUrls: ['./map-overview.component.scss']
})
export class MapOverviewComponent {

  /* #region  Variables */
  activePerson;
  activeLang: string;
  // CRO SouthWest & SouthEast bounds
  allLocations: IMapLatitudeLongitude[] = [];
  maxBounds = L.latLngBounds(
    L.latLng(42.35295, 13.518828),
    L.latLng(46.55597, 19.40382)
  );

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "assets/images/map/marker-icon.png",
      shadowUrl: "assets/images/map/marker-shadow.png"
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
    zoom: 10,
    center: L.latLng(45.440556, 16.278333)
  };
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private _mapService: MapService,
    private _translateService: TranslateService,
    private mapDetailDeterminator: MapDetailDetermintator,
    private titlecasePipe:TitleCasePipe
  ) {
    this.activeLang = _translateService.currentLang;
    this._translateService.onLangChange.subscribe(response => {
      if(response?.lang) {
        this.activeLang = response.lang;
      }
    });
    this.mapDetailDeterminator.person.subscribe(
      data => {
        this.activePerson = data;
        this.imagesRect = [];
        this.activePerson?.images.forEach((image, index) => {
          this.imagesRect.push(
            new Image( index,
              {
                img: image,
                description: `${this.activePerson.firstName } ${this.activePerson.lastName} - ${index}`
              }, {
                img: image,
              })
          )
        })
      }
    )
  }
  /* #endregion */

  /* #region  Methods */

  mapAllLocations() {
    this._mapService.getAllLocations().pipe(take(1)).subscribe(
      response => {
        this.allLocations = response;
        response.forEach(coordination => {
          L.marker(L.latLng(+coordination.latitude, +coordination.longitude), this.markerIcon)
          .addTo(this.map).on("click", (e) => {
            this.getLocationDetail(e);
            this.map.setView(e.target.getLatLng(),this.map.getZoom());
          });
        })
      }
    )
  }

  getLocationDetail(e) {
    const activeLocation = this.allLocations.find(x => x.latitude == e.latlng.lat && x.longitude == e.latlng.lng);
    if(activeLocation.id) {
      this._mapService.getSingleLocationDetail(activeLocation.id).pipe(take(1))
          .subscribe(response => {
            this.mapDetailDeterminator.changeSelectedRow(response);
            const popup = responsivePopup().setContent(this.popupTemplate(response));
            e.target.bindPopup(popup).openPopup();
            if(response.images && response.images.length) {
              let element:HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
              element.click();
            }
          });
    }
  }

  onMapReady(map: L.Map): void {
    this.map = map;
    map.setMaxBounds(this.maxBounds);
    map.setMaxZoom(18);
    map.setMinZoom(8);
    this.mapAllLocations();

  }

  openModal(item) {
    // this.modalService.open(ModalMapDetailComponent, { size: 'xl' });
  }

  popupTemplate(response) {
    return `
    <div class="alert leaflet-alert  alert-primary" style="text-align:center;" role="alert">
      <h5 class="mb-0">${this.activeLang == 'hr' ? 'Osnovni podaci' : 'General information'}</h5>
    </div>
    <ul class="list-group">
      <li class="list-group-item"><strong class="mr-1">${this.activeLang == 'hr' ? 'Ime' : 'First Name'}:</strong>${this.titlecasePipe.transform(response.firstName)}</li>
      <li class="list-group-item"><strong class="mr-1">${this.activeLang == 'hr' ? 'Prezime' : 'Last Name'}:</strong>${this.titlecasePipe.transform(response.lastName)}</li>
      <li class="list-group-item"><strong class="mr-1">${this.activeLang == 'hr' ? 'Kontakt Broj' : 'Contact Number'}:</strong>${response.contactNumber}</li>
      <li class="list-group-item"><strong class="mr-1">${this.activeLang == 'hr' ? 'Drugi Kontakt Broj' : 'Second Contact Number'}:</strong>${response.secondContactNumber}</li>
    </ul>`
  }
  /* #endregion */

  /* #region  Gallery */
  customPlainGalleryRowDescConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  imagesRect: Image[] = [];

  buttonsConfigCustom: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.CUSTOM,
    buttons: [
      KS_DEFAULT_BTN_FULL_SCREEN,
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

