import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MapOverviewComponent } from './map-overview/map-overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalMapDetailComponent } from './modal-map-detail/modal-map-detail.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';

@NgModule({
  declarations: [MapOverviewComponent, ModalMapDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    LeafletModule.forRoot(),
    GalleryModule.forRoot(),
    NgbModule,
    // Malo ruta pa nema potrebe za novim file-om
    RouterModule.forChild([
      {
        path: 'pregled',
        component: MapOverviewComponent,
        data: {
          title: "Map",
          breadcrumb: "Location Overview",
          icon: "map"
        }
      },
      {
        path: '**',
        redirectTo: 'pregled',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
    TitleCasePipe
  ],
  entryComponents: [ ModalMapDetailComponent ]
})
export class MapModule { }
