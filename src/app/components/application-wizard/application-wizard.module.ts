import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStepsComponent } from './wizard-steps/wizard-steps.component';
import { RouterModule } from '@angular/router';
import { AddressInputComponent } from './address-input/address-input.component';
import { MapInputComponent } from './map-input/map-input.component';
import { InformationInputComponent } from './information-input/information-input.component';
import { WizardNavBarComponent } from './wizard-nav-bar/wizard-nav-bar.component';
import { ArchwizardModule } from 'angular-archwizard';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadInputComponent } from './upload-input/upload-input.component';

@NgModule({
  declarations: [
    WizardStepsComponent,
    AddressInputComponent,
    MapInputComponent,
    InformationInputComponent,
    WizardNavBarComponent,
    UploadInputComponent
  ],
  imports: [
    CommonModule,
    ArchwizardModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'zadnji-korak',
        component: InformationInputComponent,
      },
      {
        path: 'drugi-korak',
        component: MapInputComponent,
      },
      {
        path: 'prvi-korak',
        component: AddressInputComponent,
      },
      {
        path: 'prijava',
        component: WizardStepsComponent,
        data: {
          title: "Request",
          breadcrumb: "Wizard for creating",
          icon: "alert-triangle"
        }
      },
      {
        path: '**',
        redirectTo: 'prijava',
        pathMatch: 'full'
      }
    ])
  ],
})
export class ApplicationWizardModule { }
