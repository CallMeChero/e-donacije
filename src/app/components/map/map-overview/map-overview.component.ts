import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from "@angular/common/http";
import { MapService } from '../services/map.service';
import { take } from 'rxjs/operators';
import { IMapLatitudeLongitude } from '../models/response/map-latitude-longitude';

@Component({
  selector: 'poke-map-overview',
  templateUrl: './map-overview.component.html',
  styleUrls: ['./map-overview.component.scss']
})
export class MapOverviewComponent {

  /* #region  Variables */

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
    private _mapService: MapService
  ) { }
  /* #endregion */

  /* #region  Methods */

  mapAllLocations() {
    this._mapService.getAllLocations().pipe(take(1)).subscribe(
      response => {
        response.forEach(coordination => {
          console.log(L.latLng(+coordination.latitude, +coordination.longitude))
          L.marker(L.latLng(+coordination.latitude, +coordination.longitude), this.markerIcon).addTo(this.map);
        })
      }
    )
  }

  onMapReady(map: L.Map): void {
    // this.http.get("assets/data/polygon.json").subscribe((json: any) => {
    //   this.json = json;
    // L.geoJSON(this.json).addTo(map);
    this.map = map;
    map.setMaxBounds(this.maxBounds);
    map.setMaxZoom(18);
    map.setMinZoom(8);
    this.mapAllLocations();
    // });
  }
  /* #endregion */

}

