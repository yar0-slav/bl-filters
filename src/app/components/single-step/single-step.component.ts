import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { EventOperator, EventProperty, FilterStep, EventsResponse, EventProperties } from '../filter.model';

@Component({
  selector: 'app-single-step',
  templateUrl: './single-step.component.html',
  styleUrls: ['./single-step.component.scss']
})

export class SingleStepComponent {
  @Input() events: any // EventsResponse
  @Input() step!: FilterStep; // FilterStep

  @Output() test = new EventEmitter<EventOperator>();

  operator?: EventOperator;
  
  selectedEvent: string = '';
  selectedEventProperties: EventProperties[] = [];// Array<string> ; string[]  ; Array<{}>

  onOperatorChange(operatorData: EventOperator) { 
    console.log(this.events);
    this.operator = operatorData;
    this.test.emit(this.operator)
  }

  getEventProperties(event: MatSelectChange) {
    const getEventProperties = this.events.filter((option: any) => option.type === event.value);
    this.selectedEventProperties  = getEventProperties[0].properties;
    this.step.event = this.selectedEvent;
  }

  getEventProperty(event: MatSelectChange) {
    this.step.properties = [{...event.value}]
  }

}