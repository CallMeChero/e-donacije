import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapOverviewComponent } from './map-overview/map-overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [MapOverviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    LeafletModule.forRoot(),
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
  ]
})
export class MapModule { }
