import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardStepsComponent } from './wizard-steps/wizard-steps.component';
import { RouterModule } from '@angular/router';
import { MapInputComponent } from './map-input/map-input.component';
import { InformationInputComponent } from './information-input/information-input.component';
import { WizardNavBarComponent } from './wizard-nav-bar/wizard-nav-bar.component';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadInputComponent } from './upload-input/upload-input.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    WizardStepsComponent,
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
    FileUploadModule,
    NgbModule,
    // GuidedTourModule,
    LeafletModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'treci-korak',
        component: InformationInputComponent,
      },
      {
        path: 'drugi-korak',
        component: InformationInputComponent,
      },
      {
        path: 'prvi-korak',
        component: MapInputComponent,
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
  // providers: [
  //   GuidedTourService
  // ]
})
export class ApplicationWizardModule { }
