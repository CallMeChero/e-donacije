import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MapDetailDetermintator {
  // action
  private determinator = new BehaviorSubject(null);
  person = this.determinator.asObservable();
  constructor() { }

  changeSelectedRow(object) {
    this.determinator.next(object);
  }
}
