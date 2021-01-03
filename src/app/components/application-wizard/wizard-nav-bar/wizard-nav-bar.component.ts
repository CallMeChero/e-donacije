import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-wizard-nav-bar',
  templateUrl: './wizard-nav-bar.component.html',
  styleUrls: ['./wizard-nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WizardNavBarComponent implements OnInit {

  /* #region  Variables */
  isCroatianLanguageActive: boolean = true;
  secondStepInitialized: boolean = false;
  /* #endregion */

  constructor(
    private readonly _translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this._translateService.onLangChange.subscribe(response => {
      this.isCroatianLanguageActive = response?.lang == 'hr' ? true : false;
    });
  }
}
