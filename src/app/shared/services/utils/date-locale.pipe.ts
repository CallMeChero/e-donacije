import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Pipe({ name: 'dateLocale', pure: false })
export class DateLocalePipe implements PipeTransform {

  /* #region  Constructor */
  constructor(public translate: TranslateService) { }
  /* #endregion */

  /* #region  Pipe methods */
  // Transform value
  transform(value: string, dateFormat: string): any {
    if (!this.translate.currentLang) {
      let lang = this.translate.defaultLang;
    }
    let lang = this.translate.currentLang;
    if (!value) {
      return ''
    }

    moment.locale(lang)
    let dateLocale = moment.utc(value).local();
    return dateLocale.format(dateFormat);
  }
  /* #endregion */

}
