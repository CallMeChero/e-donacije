import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'poke-map-overview',
  templateUrl: './map-overview.component.html',
  styleUrls: ['./map-overview.component.scss']
})
export class MapOverviewComponent implements OnInit {

  /* #region  Variables */

  // CRO SouthWest & SouthEast bounds
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
  constructor(private http: HttpClient) { }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
  }

  onMapReady(map: L.Map): void {
    // this.http.get("assets/data/polygon.json").subscribe((json: any) => {
    //   this.json = json;
    // L.geoJSON(this.json).addTo(map);
    map.setMaxBounds(this.maxBounds);
    map.setMaxZoom(18);
    map.setMinZoom(6);
    // });
  }
  /* #endregion */

}

