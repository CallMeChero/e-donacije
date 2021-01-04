import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FileLikeObject, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ApplicationWizardService } from '../services/application-wizard.service';
import { RequestIdDeterminator } from '../services/determinators/request-id.determinator';

// const URL = '/api/';
const URL = 'https://edonacijeapi.azurewebsites.net//DonationRequestImage/uploadImage/';

@Component({
  selector: 'app-upload-input',
  templateUrl: './upload-input.component.html',
  styleUrls: ['./upload-input.component.scss']
})
export class UploadInputComponent implements OnInit {

  /* #region  Variables */
  maxFileSize:number  = 5 * 1024 * 1024; // modify this to your desired max file size
  uploader: FileUploader;
  activeLang: string;
  allowedMimeTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
  hasBaseDropZoneOver: boolean = false;
  fileCount: number = 0;
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private _translateService: TranslateService,
    private _notificationService: NotificationService,
    private _requestIdDeterminator: RequestIdDeterminator,
    private _router: Router,
    private _applicationWizardService: ApplicationWizardService
  ) {
    this.activeLang = _translateService.currentLang;
  }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    this._requestIdDeterminator.requestId.subscribe(
      data => {
        this.uploader = new FileUploader({
          url: URL + data,
          isHTML5: true,
          maxFileSize: this.maxFileSize,
          allowedMimeType: this.allowedMimeTypes,
          queueLimit : 2
        });
        this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);
        this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
        this.uploader.onBeforeUploadItem = (item) => {
          item.withCredentials = false;
        }
      }
    );
  }

  removeFile(file) {
    if(!file.id) {
      // nije poslan na server
      file.remove();
      return false;
    } else if(file.isSuccess && file.isUploaded) {
      // na serveru je
      this.fileCount = this.fileCount - 1;
      this._applicationWizardService.removeFile(file.id).pipe(take(1)).subscribe(
        data => { console.log('Uspjesno brisanje file-a') }
      );
      file.remove();
    } else {
      return
    }
  }

  removeAllFiles() {
    if(this.uploader.queue.length) {
      this.uploader.queue.forEach((file: any) => {
        if(file && file.id) {
          this.fileCount = this.fileCount - 1;
          this._applicationWizardService.removeFile(file.id).pipe(take(1)).subscribe(
            data => { console.log('Uspjesno brisanje file-a') }
          );
        }

      })
      setTimeout(() => { this.uploader.clearQueue() }, 100);
    }
  }

  onSuccessItem(item, response, status, headers) {
    item.id = response;
    this.fileCount = this.fileCount + 1;
    if(this.fileCount >= 2) {
        this.finishWithWizard();
    }
  }

  onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any): void {
    const title = this.activeLang !== 'hr' ? "Greška": "Error";
    switch (filter.name) {
      case 'queueLimit':
        const queueLimitMsg = this.activeLang !== 'hr' ?
        "Maximum number of files for upload is set to 2.":
        "Maksimalni broj datoteka je 2."
        this._notificationService.fireErrorNotification(title,queueLimitMsg);
        break;
      case 'fileSize':
        const msg = this.activeLang !== 'hr' ?
        `Maximum upload size exceeded (${item.size} of ${this.maxFileSize} allowed)`:
        `Datatoteka je premašila maksimalnu veličinu (${item.size} od dopuštenih ${this.maxFileSize})`
        this._notificationService.fireErrorNotification(title,msg);
        break;
      case 'mimeType':
        const allowedTypes = this.allowedMimeTypes.join(', ');
        const message = this.activeLang !== 'hr' ?
        `Type "${item.type}" is not allowed. Allowed types: "${allowedTypes}"`:
        `Tip datoteke "${item.type}" nije dopušten. Moguće je poslati: ${allowedTypes} tipove datoteka`
        this._notificationService.fireErrorNotification(title,message);
        break;
      default:
        const errorMsg = this.activeLang == 'hr' ?
        "Dogodila se nepoznata greška. Kontaktirajte administratora":
        "Unknown error occured. Contact administrator"
        this._notificationService.fireErrorNotification(title,errorMsg);
    }
  }

  finishWithWizard(): void {
    console.log(this.fileCount)
    const title = this.activeLang !== 'hr' ? "Uspjeh": "Success";
    this._notificationService.fireSuccessMessage(title,
      this.activeLang == 'hr' ? "Zahtjev je uspješno kreiran.":
      "Entry is successfully submitted."
    );
    this._router.navigate(['mapa/pregled']);
  }
  /* #endregion */
}
