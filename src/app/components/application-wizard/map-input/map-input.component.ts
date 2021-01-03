import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet';
import { take } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IApplicationMap } from '../models/request/application-map';
import { ApplicationWizardService } from '../services/application-wizard.service';
import { LatitudeLongitudeDeterminator  } from '../services/determinators/latitute-longitude.determinator';

@Component({
  selector: 'poke-map-input',
  templateUrl: './map-input.component.html',
  styleUrls: ['./map-input.component.scss']
})
export class MapInputComponent implements OnInit {

  /* #region  Variables */
  isMarkerActive: boolean = false;
  elementClicked: boolean = false;
  // CRO SouthWest & SouthEast bounds
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
    private _applicationWizardService: ApplicationWizardService,
    private _notificationService: NotificationService,
    private _translateService: TranslateService,
    private _ref: ChangeDetectorRef,
    private _latitudeLongitudeDeterminator: LatitudeLongitudeDeterminator
  ) { }

  ngOnInit(): void {}

  onMapReady(map: L.Map): void {
    map.setMaxBounds(this.maxBounds);
    map.setMaxZoom(18);
    map.setMinZoom(8);
    this.map = map;
    this.map.on("click", (event:any) => {
      if(event.latlng) {
        this.map.eachLayer(
          item => {
            if (item instanceof L.Marker){
              this.map.removeLayer(item);
            }
          }
        )
        this.isMarkerActive = true;
        setTimeout(() => {
          this.newMarker = L.marker(event.latlng, this.markerIcon).addTo(this.map);
          this._ref.detectChanges();
        }, 50);
      }
    });
  }

  saveMarker(): void {
    const isMarkerActive = this.map.hasLayer(this.newMarker);
    if(isMarkerActive) {
      const markerValues = this.newMarker.getLatLng();
      const values: IApplicationMap = {
        latitude: markerValues.lat.toString(),
        longitude: markerValues.lng.toString()
      }
        this._applicationWizardService.sendLocation(values).pipe(take(1)).subscribe(
          data => {
            if(!this.elementClicked) {
                this.elementClicked = true;
                let element:HTMLElement = document.getElementById('auto_trigger') as HTMLElement;
                element.click();
                this._latitudeLongitudeDeterminator.changeSelectedRow(values);
            }
          }
        )
    } else {
      const title = this._translateService.currentLang == 'hr' ? "Pogreška" : "Error";
      const msg = this._translateService.currentLang == 'hr' ? "Marker mora postojati na mapi" : "Marker must be on map";
      this._notificationService.fireWarningMessage(title,msg);
    }
  }

  saveStep(): void {

  }
}
