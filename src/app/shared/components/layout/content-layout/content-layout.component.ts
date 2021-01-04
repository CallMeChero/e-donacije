import { Component, AfterViewInit } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import * as feather from 'feather-icons';
import { CustomizerService } from '../../../services/customizer.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements AfterViewInit {

  moduleLoading: boolean;
  constructor(
    public navServices: NavService,
    public customizer: CustomizerService
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }
}
