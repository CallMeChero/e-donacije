import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  declarations: [DashboardOverviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    CarouselModule,
    // Malo ruta pa nema potrebe za novim file-om
    RouterModule.forChild([
      {
        path: '',
        component: DashboardOverviewComponent,
        data: {
          title: "Dashboard",
          breadcrumb: "General Information",
          icon: "monitor"
        }
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
    DatePipe,
    DashboardService
  ]
})
export class DashboardModule { }
