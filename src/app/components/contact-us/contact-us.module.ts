import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactOverviewComponent } from './contact-overview/contact-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ContactOverviewComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    // Malo ruta pa nema potrebe za novim file-om
    RouterModule.forChild([
      {
        path: '',
        component: ContactOverviewComponent,
        data: {
          title: "Contact",
          breadcrumb: "Contact Page",
          icon: "help-circle"
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
export class ContactUsModule { }
