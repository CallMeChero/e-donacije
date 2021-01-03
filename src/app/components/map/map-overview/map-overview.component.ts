import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from "@angular/common/http";
import { MapService } from '../services/map.service';
import { take } from 'rxjs/operators';
import { IMapLatitudeLongitude } from '../models/response/map-latitude-longitude';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMapDetailComponent } from '../modal-map-detail/modal-map-detail.component';
import { MapDetailDetermintator } from '../services/determinators/map-detail.determinator';

@Component({
  selector: 'poke-map-overview',
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
    private modalService: NgbModal,
    private mapDetailDeterminator: MapDetailDetermintator
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
            console.log(e)
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
            e.target.bindPopup(this.popupTemplate(response)).openPopup();
            let element:HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
            element.click();
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
    this.modalService.open(ModalMapDetailComponent, { size: 'xl' });
  }

  popupTemplate(response) {
    return `
    <div class="alert leaflet-alert  alert-primary" role="alert">
        ${this.activeLang == 'hr' ? 'Osnovni podaci' : 'General information'}
    </div>
    <ul class="list-group" style="max-height: 300px;">
      <li class="list-group-item"><strong>${this.activeLang == 'hr' ? 'Ime' : 'First Name'}:</strong>${response.firstName}</li>
      <li class="list-group-item"><strong>${this.activeLang == 'hr' ? 'Prezime' : 'Last Name'}:</strong>${response.lastName}</li>
      <li class="list-group-item"><strong>${this.activeLang == 'hr' ? 'Kontakt Broj' : 'Contact Number'}:</strong>${response.contactNumber}</li>
      <li class="list-group-item"><strong>${this.activeLang == 'hr' ? 'Kontakt Broj 2' : 'Contact Number'}:</strong>${response.secondContactNumber}</li>
    </ul>`
  }
  /* #endregion */

}

