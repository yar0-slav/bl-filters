import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventsResponse } from "../components/filter.model";

@Injectable()
export class FilterDataService {

  readonly ROOT_URL = 'https://br-fe-assignment.github.io/customer-events/events.json';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<EventsResponse>(this.ROOT_URL)
  }


  // getData() Observable<Events[]> {
  //   return this.http.get<Events>(this.ROOT_URL)
  // }
}
