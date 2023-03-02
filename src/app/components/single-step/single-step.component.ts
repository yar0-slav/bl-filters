import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import {
  EventOperator,
  EventProperty,
  FilterStep,
  EventsResponseProps,
} from '../filter.model';

@Component({
  selector: 'app-single-step',
  templateUrl: './single-step.component.html',
  styleUrls: ['./single-step.component.scss'],
})
export class SingleStepComponent {
  @Input() events: EventsResponseProps[] = [];
  @Input() step!: FilterStep;
  @Input() stepIndex!: number;

  @Output() eventPropertiesOutput = new EventEmitter<[any, any]>();
  @Output() eventNameOutput = new EventEmitter<string>();
  @Output() stepIndexOutput = new EventEmitter<number>();
  @Output() removeCurrentStep = new EventEmitter<any>(); // TODO: change from any
  @Output() addEventAttribute = new EventEmitter<any>(); // TODO: change from any

  eventProperties: EventProperty[] = [ new EventProperty() ];
  eventProps: FilterStep[] = [ new FilterStep() ];

  selectedEvent: string = '';
  arrayOfEventProperties: EventProperty[] = [];
  selectedProperties: { property: string, type: string }[] = [];

  onEventChange(event: MatSelectChange) {
    this.stepIndexOutput.emit(this.stepIndex);
    this.eventNameOutput.emit(this.selectedEvent);
    this.getEventProperties(event);
  }

  onPropertyChange(event: MatSelectChange, index: number) {
    this.stepIndexOutput.emit(this.stepIndex);
    const propertyValue = event.value.property;
    const typeValue = event.value.type;

    this.selectedProperties[index] = event.value;

    this.eventProperties[index] = {
      ...this.eventProperties[index],
      property: propertyValue,
      type: typeValue,
    } 

    this.eventPropertiesOutput.emit([this.eventProperties, index])
  } 

  onOperatorChange(operatorData: EventOperator[], index: number) {
    this.stepIndexOutput.emit(this.stepIndex);

    this.eventProperties[index] = {
      ...this.eventProperties[index],
      operator: operatorData[index]
    }

    console.log('event props', this.eventProperties);

    // this.eventPropertiesOutput.emit([this.eventProperties, index]);
  }

  addNewAttribute() {
    this.addEventAttribute.emit();
    // this.step.properties = [...this.step.properties, new EventProperty()];
    // add back here
  }

  getEventProperties(event: MatSelectChange) {
    const filterEventProperties = this.events.filter(
      (option: any) => option.type === event.value
    );
    this.arrayOfEventProperties = filterEventProperties[0].properties;
  }

  stepDelete() {
    this.removeCurrentStep.emit(this.stepIndex);
  }
  
}
