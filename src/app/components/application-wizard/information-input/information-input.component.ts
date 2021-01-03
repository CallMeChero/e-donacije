import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IApplicationMap } from '../models/request/application-map';
import { ApplicationWizardService } from '../services/application-wizard.service';
import { LatitudeLongitudeDeterminator } from '../services/determinators/latitute-longitude.determinator';
import { RequestIdDeterminator } from '../services/determinators/request-id.determinator';

@Component({
  selector: 'poke-information-input',
  templateUrl: './information-input.component.html',
  styleUrls: ['./information-input.component.scss']
})
export class InformationInputComponent implements OnInit {

  /* #region  Variables*/
  informationGroup: FormGroup;
  latAndLang: IApplicationMap;
  currentLang: string;
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _applicationWizardService: ApplicationWizardService,
    private _latitudeLongitudeDeterminator: LatitudeLongitudeDeterminator,
    private _requestIdDeterminator: RequestIdDeterminator,
    private _fb: FormBuilder,
    private _router: Router,
    private _notificationService: NotificationService,
    private _translateService: TranslateService
  ) {
    this.currentLang = _translateService.currentLang;
  }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    this.setUpFormGroup();
    this._latitudeLongitudeDeterminator.latAndLang.subscribe(
      data => {
        this.latAndLang = data;
      }
    )
  }

  setUpFormGroup() {
    this.informationGroup = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      contactNumber: ['', [Validators.required ,Validators.pattern('^[0-9-]{7,13}$')]],
      secondContactNumber: ['', Validators.pattern('^[0-9-]{7,13}$')],
      bankName: ['', Validators.maxLength(25)],
      iban: ['', [Validators.pattern('^[0-9]{19}$')]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      addressNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      postalCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5),Validators.pattern('^[0-9]*$')]],
      body: ['', [Validators.minLength(10), Validators.maxLength(150)]]
    });
  }

  saveInfoStep() {
    if(this.informationGroup.invalid) {
      return
    } else {
      console.log(this.informationGroup.value)
      if(this.informationGroup.dirty) {
        this._applicationWizardService.sendInformationStep(this.informationGroup.value, this.latAndLang).pipe(take(1)).subscribe(
          data => {
            this._requestIdDeterminator.changeRequestId(data)
          },
          error => {
            this._router.navigate(['donacija/prijava']);
            const title = this.currentLang == 'hr' ? "Pogreška" : "Error";
            const msg = this.currentLang == "hr" ? "Kontaktirajte administratora" : "Contact administrator";
            this._notificationService.fireErrorNotification(title,msg);
          }
        )
      }
    }
  }
  /* #endregion */

 /* #region  Abstract Controls */
  get firstName(): AbstractControl | null {
    return this.informationGroup.get('firstName');
  }
  get lastName(): AbstractControl | null {
    return this.informationGroup.get('lastName');
  }
  get contactNumber(): AbstractControl | null {
    return this.informationGroup.get('contactNumber');
  }
  get secondContactNumber(): AbstractControl | null {
    return this.informationGroup.get('secondContactNumber');
  }
  get bankName(): AbstractControl | null {
    return this.informationGroup.get('bankName');
  }
  get iban(): AbstractControl | null {
    return this.informationGroup.get('iban');
  }
  get address(): AbstractControl | null {
    return this.informationGroup.get('address');
  }
  get addressNumber(): AbstractControl | null {
    return this.informationGroup.get('addressNumber');
  }
  get postalCode(): AbstractControl | null {
    return this.informationGroup.get('postalCode');
  }
  get body(): AbstractControl | null {
    return this.informationGroup.get('body');
  }
  /* #endregion */
}
