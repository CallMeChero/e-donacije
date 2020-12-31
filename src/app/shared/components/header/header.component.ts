
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { CustomHTMLElement } from '../../models/custom-html-element';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /* #region  Component variables */
  currentDate = new Date();
  menuItems: Menu[];
  items: Menu[];
  openNav: boolean = false;
  right_sidebar: boolean = false;
  text: string;
  elem: CustomHTMLElement;
  language: string;
  localStorePrimaryColor: string = "";
  /* #endregion */

  /* #region  Component events */
  @Output() rightSidebarEvent = new EventEmitter<boolean>();
  /* #endregion */

  /* #region  Constructor */
  constructor(
    public navServices: NavService,
    @Inject(DOCUMENT) private document: any,
    private translate: TranslateService
  ) {
    this.localStorePrimaryColor = localStorage.getItem("primary_color");
    translate.setDefaultLang('hr');
    translate.currentLang = 'hr';
  }
  /* #endregion */

  /* #region  Component methods */
  ngOnInit(): void {
    this.elem = document.documentElement;
    this.navServices.items.subscribe(menuItems => {
      this.items = menuItems;
    });
    this.language = this.translate.currentLang;
  }

  // I18n language change
  changeLanguage(lang: string): void {
    this.language = lang;
    this.translate.use(lang);
  }

  // Open / Close navigation
  collapseSidebar(): void {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  // Toglle full sreen - support for other browsers included
  toggleFullScreen() {
    if (this.navServices.fullScreen) {
      this.closeFullScreen();
    } else {
      this.openFullScreen();
    }

  }

  // Open full screen
  openFullScreen() {
    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) {
      /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    }
    this.navServices.fullScreen = true;
  }

  // Close full screen
  closeFullScreen() {
    const docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (docWithBrowsersExitFunctions.exitFullscreen) {
      docWithBrowsersExitFunctions.exitFullscreen();
    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) {
      /* Firefox */
      docWithBrowsersExitFunctions.mozCancelFullScreen();
    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      docWithBrowsersExitFunctions.webkitExitFullscreen();
    } else if (docWithBrowsersExitFunctions.msExitFullscreen) {
      /* IE/Edge */
      docWithBrowsersExitFunctions.msExitFullscreen();
    }
    this.navServices.fullScreen = false;
  }

  // Open mobile navigation for nav-menus
  openMobileNav() {
    this.openNav = !this.openNav;
  }
  /* #endregion */

}
