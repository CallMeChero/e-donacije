import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/* #region  Menu Class */
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}
/* #endregion */

@Injectable({
  providedIn: 'root'
})
export class NavService {

  /* #region  Service variables */
  public screenWidth: number;
  public collapseSidebar: boolean = false;
  public fullScreen = false;
  public languageCroatian: boolean = false;
  /* #endregion */


  /* #region  Constructor */
  constructor(
  ) {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }
  /* #endregion */


  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  /* #region  Menu Items */
  MENUITEMS: Menu[] = [
    {
      path: '/naslovna', title: 'Dashboard', icon: 'monitor', type: 'link', badgeType: 'primary', badgeValue: 'new', active: true
    },
    {
      path: '/donacija', title: 'Need Donation', icon: 'alert-triangle', type: 'link', badgeType: 'primary', badgeValue: 'new', active: true
    },
    {
      path: '/mapa', title: 'Map', icon: 'map', type: 'link', badgeType: 'primary', badgeValue: 'new', active: true
    },
    {
      path: '/o-nama', title: 'About Us', icon: 'map', type: 'link', badgeType: 'primary', badgeValue: 'new', active: true
    },
  ];

  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
  /* #endregion */

}
