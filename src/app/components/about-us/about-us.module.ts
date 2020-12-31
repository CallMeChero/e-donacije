import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutOverviewComponent } from './about-overview/about-overview.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AboutOverviewComponent],
  imports: [
    CommonModule,
    TranslateModule,
    // Malo ruta pa nema potrebe za novim file-om
    RouterModule.forChild([
      {
        path: '',
        component: AboutOverviewComponent,
        data: {
          title: "About Us",
          breadcrumb: "Who are we?",
          icon: "users"
        }
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ]
})
export class AboutUsModule { }
