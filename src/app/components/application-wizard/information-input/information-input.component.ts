import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ApplicationWizardService } from '../services/application-wizard.service';

@Component({
  selector: 'poke-information-input',
  templateUrl: './information-input.component.html',
  styleUrls: ['./information-input.component.scss']
})
export class InformationInputComponent implements OnInit {

  /* #region  Variables*/
  informationGroup: FormGroup;
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _applicationWizardService: ApplicationWizardService,
    private _fb: FormBuilder
  ) { }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    this.setUpFormGroup();
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
      addressNumber: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(5),Validators.pattern('^[0-9]*$')]],
      body: ['', [Validators.minLength(10), Validators.maxLength(150)]]
    });
  }

  save() {
    if(this.informationGroup.invalid) {
      return
    } else {
      console.log(this.informationGroup.value)
      if(this.informationGroup.dirty) {
        // this._applicationWizardService.sendAddress(this.informationGroup.value).pipe(take(1)).subscribe(
        //   data => {

        //   }
        // )
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
