import { Component, Input, OnInit } from '@angular/core';
import { AdvancedLayout, ButtonEvent, ButtonsConfig, ButtonsStrategy, Image, KS_DEFAULT_BTN_CLOSE, KS_DEFAULT_BTN_DOWNLOAD, KS_DEFAULT_BTN_FULL_SCREEN, PlainGalleryConfig, PlainGalleryStrategy } from '@ks89/angular-modal-gallery';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { MapDetailDetermintator } from '../services/determinators/map-detail.determinator';

@Component({
  selector: 'poke-modal-map-detail',
  templateUrl: './modal-map-detail.component.html',
  styleUrls: ['./modal-map-detail.component.scss']
})
export class ModalMapDetailComponent implements OnInit {

  customPlainGalleryRowDescConfig: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.CUSTOM,
    layout: new AdvancedLayout(-1, true)
  };

  imagesRect: Image[] = [];

  buttonsConfigCustom: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.CUSTOM,
    buttons: [
      KS_DEFAULT_BTN_FULL_SCREEN,
      KS_DEFAULT_BTN_DOWNLOAD,
      KS_DEFAULT_BTN_CLOSE
    ]
  };

  person;
  title: string;
  constructor(
    private _modal: NgbActiveModal,
    private _mapDetailDeterminator: MapDetailDetermintator,
    private _translateService: TranslateService
  ) {
    this.title = this._translateService.currentLang == 'hr' ? 'Opće informacije' : 'General information'
  }

  ngOnInit(): void {
    this._mapDetailDeterminator.person.subscribe(
      data => {
        this.person = data;
        if(this.person.images) {
          this.person.images.forEach((image, index) => {
            this.imagesRect.push(
              new Image( index,
                {
                  img: image,
                  description: 'Image Caption ' + index
                }, {
                  img: image,
                })
            )
          })
        }
      }
    )
  }

  openImageModalRowDescription(image: Image) {
    const index: number = this.getCurrentIndexCustomLayout(image, this.imagesRect);
    this.customPlainGalleryRowDescConfig = Object.assign({}, this.customPlainGalleryRowDescConfig, { layout: new AdvancedLayout(index, true) });
  }

  private getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  };

  onButtonBeforeHook(event: ButtonEvent) {
    if (!event || !event.button) {
      return;
    }
  }

  onButtonAfterHook(event: ButtonEvent) {
    if (!event || !event.button) {
      return;
    }
  }

  exitModal():void {
    this._modal.close();
  }

  sendMeToAutoTranslate(message) {
    window.open('http://translate.google.com/#auto/en/' + message, '_blank');
  }
}
