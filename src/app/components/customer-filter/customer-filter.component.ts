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

  onStepChange(stepData: FilterStep, index: number) { 
    console.log('parent stepData', stepData); 
    this.filter.filterSteps[index] = stepData; 
  }
  
  addNewStep() {
    const step = this.filter.filterSteps;
    step.push(new FilterStep())
  }

  addNewAttribute() {
    const properties = this.filter.filterSteps.at(this.stepIndex)!.properties;
    properties.push(new EventProperty());
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

  trackByIndex(index: number) {
    return index;
  }

  fetchData(): void {
    this.filtersService.getData().subscribe(data => {
      this.events = data?.events || [];
    });
  }

}
