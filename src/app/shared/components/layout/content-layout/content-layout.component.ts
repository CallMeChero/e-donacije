import { Component, AfterViewInit } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import * as feather from 'feather-icons';
import { CustomizerService } from '../../../services/customizer.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInRight } from 'ng-animate';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [trigger('fadeInRight', [transition('* => *', useAnimation(fadeInRight))])]
})
export class ContentLayoutComponent implements AfterViewInit {

  constructor(public navServices: NavService, public customizer: CustomizerService) {   }

  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }
}
