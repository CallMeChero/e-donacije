import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ContactUsService } from '../services/contact-us.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'poke-contact-overview',
  templateUrl: './contact-overview.component.html',
  styleUrls: ['./contact-overview.component.scss']
})
export class ContactOverviewComponent implements OnInit {

  /* #region  Component variables */
  contactGroup: FormGroup;
  /* #endregion */

  /* #region Constructor */
  constructor(
    private _fb: FormBuilder,
    private readonly _contactUsService: ContactUsService,
    private readonly _notificationService: NotificationService,
    private readonly _translateService: TranslateService
  ) { }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    this.setUpFormGroup();
  }

  // Initialize form group for login
  setUpFormGroup(): void {
    this.contactGroup = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    });
  }

  sendForm(): void {
    if(this.contactGroup.invalid) {
      return;
    } else {
      if(this.contactGroup.dirty) {
        this._contactUsService.sendContactForm(this.contactGroup.value).pipe(take(1)).subscribe(
          data => {
            const title = this._translateService.currentLang == 'hr' ? "Uspjeh": "Success";
            const message = this._translateService.currentLang == 'hr' ?
            "Forma je uspješno poslana, odgovoriti ćemo Vam u najbržem mogućem roku"
            : "Form has been successfully sent. Expect reply as soon as possible";
            this._notificationService.fireSuccessMessage(title, message);
          }
        )
      }
    }
  }
  /* #endregion */

  /* #region  Abstract controls */
  get name(): AbstractControl | null { return this.contactGroup.get('name'); }
  get email(): AbstractControl | null { return this.contactGroup.get('email'); }
  get message(): AbstractControl | null { return this.contactGroup.get('message'); }
  /* #endregion */

}
