import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventsResponseProps } from '../components/filter.model';

@Injectable()
export class CurrentEvents {
  private eventName = new BehaviorSubject<string>('');
  private eventArray = new BehaviorSubject<EventsResponseProps[]>([]);

  constructor() {}

  setCurrentEventName(value: string) {
    this.eventName.next(value);
  }

  getCurrentEventName() {
    return this.eventName.asObservable();
  }

  setCurrentEventArray(value: EventsResponseProps[]) {
    this.eventArray.next(value);
  }

  getCurrentEventArray() {
    return this.eventArray.asObservable();
  }
}
