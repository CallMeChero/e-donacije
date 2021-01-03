import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestIdDeterminator {
  // action
  private determinator = new BehaviorSubject(null);
  requestId = this.determinator.asObservable();
  constructor() { }

  changeRequestId(object: number) {
    this.determinator.next(object);
  }
}
