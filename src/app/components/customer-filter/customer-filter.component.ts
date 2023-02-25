import { Component, OnInit } from '@angular/core';
import { FilterDataService } from 'src/app/services/filter-data.service';
import { EventOperator, EventProperties, FilterStep } from '../filter.model';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss'],
  providers: [FilterDataService],
})
export class CustomerFilterComponent implements OnInit {
  events: EventProperties[] = [];
  steps: FilterStep[] = [];

  constructor(private filtersService: FilterDataService) {}

  ngOnInit(): void {
    this.fetchData();
    this.steps.push(new FilterStep());
  }

  onOperatorChange(event: EventOperator) {
    console.log('parent: ', event);
  }

  fetchData(): void {
    this.filtersService.getData().subscribe(data => {
      console.log(data.events);
      this.events = data?.events || [];
    });
  }
}
