import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { take } from 'rxjs/operators';
import { IApplicationMap } from '../models/request/application-map';
import { ApplicationWizardService } from '../services/application-wizard.service';

@Component({
  selector: 'poke-map-input',
  templateUrl: './map-input.component.html',
  styleUrls: ['./map-input.component.scss']
})
export class MapInputComponent implements OnInit, OnChanges{

  /* #region  Variables */

  // CRO SouthWest & SouthEast bounds
  address: string = 'Ivane Brlić Mažuranić';
  initialLatAndLang = L.latLng(45.3770786, 16.3204046);
  isEdit: boolean = false;
  initialMarker: L.Marker;
  newMarker: L.Marker;
  @Input() stepInitialized: boolean;

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


  constructor(
    private _applicationWizardService: ApplicationWizardService
  ) { }

  ngOnInit(): void {}

  ngOnChanges(event): void {
    if(event && event.stepInitialized.currentValue === true) {
      // bez ovog se kontejner nece resizati za mapu jer imamo wizard...tugy plaky
      setTimeout(() => {
        this.map.invalidateSize();
      },50);
    }
  }

  editLocation(): void {
    this.isEdit = !this.isEdit;
    if(this.newMarker && !this.initialMarker) {
      this.map.removeLayer(this.newMarker);
      this.initMarkers();
    }
  }

  initMarkers(): void {
    // lat i lang response
    const popupInfo = `<b>${ this.address }</b>`;
    this.initialMarker = L.marker(this.initialLatAndLang, this.markerIcon)
      .addTo(this.map)
      .bindPopup(popupInfo);
  }

  onMapReady(map: L.Map): void {
    map.setMaxBounds(this.maxBounds);
    map.setMaxZoom(18);
    map.setMinZoom(8);
    this.map = map;
    this.initMarkers();
    this.map.on("click", (event:any) => {
      if(event.latlng && this.isEdit) {
        this.map.eachLayer(
          item => {
            if (item instanceof L.Marker){
              this.map.removeLayer(item);
            }
          }
        )
        setTimeout(() => { this.newMarker = L.marker(event.latlng, this.markerIcon).addTo(this.map)}, 50);
      }
    });
  }

  saveStep(): void {
    const editActive = this.isEdit ? this.newMarker.getLatLng() : this.initialMarker.getLatLng();
    const values: IApplicationMap = {
      lat: editActive.lat.toString(),
      lng: editActive.lng.toString()
    }
    this._applicationWizardService.sendLocation(values).pipe(take(1)).subscribe(
      data => {
        console.log(data)
      }
    )
  }
}
