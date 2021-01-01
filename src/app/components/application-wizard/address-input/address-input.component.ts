import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ApplicationWizardService } from '../services/application-wizard.service';

@Component({
  selector: 'poke-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnInit {

  /* #region  Variables*/
  addressGroup: FormGroup;
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
    this.addressGroup = this._fb.group({
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      addressNumber: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(5),Validators.pattern('^[0-9]*$')]]
    });
  }

  save() {
    this._applicationWizardService.sendAddress(this.addressGroup.value).pipe(take(1)).subscribe(
      data => {

      }
    )
  }
  /* #endregion */

   /* #region  Abstract Controls */
   get address(): AbstractControl | null {
    return this.addressGroup.get('address');
  }
  get addressNumber(): AbstractControl | null {
    return this.addressGroup.get('addressNumber');
  }
  get postalCode(): AbstractControl | null {
    return this.addressGroup.get('postalCode');
  }
  /* #endregion */
}
