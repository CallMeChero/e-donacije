import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IApplicationMap } from '../../models/request/application-map';

@Injectable({
    providedIn: 'root'
})
export class LatitudeLongitudeDeterminator {
  // action
  private determinator = new BehaviorSubject(null);
  latAndLang = this.determinator.asObservable();
  constructor() { }

  changeSelectedRow(object: IApplicationMap) {
    this.determinator.next(object);
  }
}
