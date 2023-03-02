import { Component, OnInit } from '@angular/core';
import { FilterDataService } from 'src/app/services/filter-data.service';
import { Filter, EventProperty, EventsResponseProps, FilterStep } from '../filter.model';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss'],
  providers: [ FilterDataService ],
})
export class CustomerFilterComponent implements OnInit {
  events: EventsResponseProps[] = [];
  filter: Filter;
  stepIndex!: number;

  constructor(private filtersService: FilterDataService) {
    this.filter = new Filter()
  }

  ngOnInit(): void {
    this.fetchData();
  }

  onPropertyChange(data: any) {
    const updatedProperty = data[0];
    const indexOfProperty = data[1];
    this.filter.filterSteps[this.stepIndex].properties[indexOfProperty] = updatedProperty[indexOfProperty]
    // TODO: change from ANY
  }

  onEventNameChange(eventName: string) {
    this.filter.filterSteps.at(this.stepIndex)!.event = eventName;
  }
  
  addNewStep() {
    const step = this.filter.filterSteps;
    step.push(new FilterStep())
  }

  addNewAttribute() {
    const properties = this.filter.filterSteps.at(this.stepIndex)!.properties;
    properties.push(new EventProperty());
    console.log(properties);
  }


  deleteStepAtIndex(index: number) {
    this.filter.filterSteps.splice(index, 1)
  }

  applyFilter() {
    console.log(this.filter)
  }

  currentStepIndex(event: number) {
    this.stepIndex = event;
  }

  fetchData(): void {
    this.filtersService.getData().subscribe(data => {
      this.events = data?.events || [];
    });
  }
}
