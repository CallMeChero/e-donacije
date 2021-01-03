import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { NotificationService } from 'src/app/shared/services/notification.service';

// const URL = '/api/';
const URL = 'https://httpbin.org/post';

@Component({
  selector: 'poke-upload-input',
  templateUrl: './upload-input.component.html',
  styleUrls: ['./upload-input.component.scss']
})
export class UploadInputComponent implements OnInit {

  maxFileSize:number  = 5 * 1024 * 1024; // modify this to your desired max file size
  uploader: FileUploader;
  activeLang: string;
  allowedMimeTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
  hasBaseDropZoneOver: boolean = false;

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  constructor(
    private _translateService: TranslateService,
    private _notificationService: NotificationService
  ) {
    this.activeLang = _translateService.currentLang;
    this.uploader = new FileUploader({
      url: URL,
      isHTML5: true,
      maxFileSize: this.maxFileSize,
      allowedMimeType: this.allowedMimeTypes,
      queueLimit : 3
    });
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
   }

  ngOnInit(): void {
  }

  onSuccessItem(item, response, status, headers) {
    console.log(response)
  }
  onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any): void {
    const title = this.activeLang !== 'hr' ? "Greška": "Error";
    switch (filter.name) {
      case 'queueLimit':
        const queueLimitMsg = this.activeLang !== 'hr' ?
        "Maximum number of files for upload is set to 3.":
        "Maksimalni broj datoteka je 3."
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
    const title = this.activeLang !== 'hr' ? "Uspjeh": "Success";
    this._notificationService.fireSuccessMessage(title,
      this.activeLang == 'hr' ? "Zahtjev je uspješno kreiran.":
      "Entry is successfully submitted."
      )
  }
}
