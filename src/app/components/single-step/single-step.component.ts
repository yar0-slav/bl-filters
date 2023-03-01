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

  eventProperties: EventProperty[] =[new EventProperty()];
  eventProps: FilterStep[] = [new FilterStep()];

  selectedEvent: string = '';
  selectedEventProperties: EventProperty[] = [];

  onEventChange(event: MatSelectChange) {
    this.stepIndexOutput.emit(this.stepIndex);
    this.eventNameOutput.emit(this.selectedEvent);
    this.getEventProperties(event);
  }

  onPropertyChange(event: MatSelectChange, index: number) {
    this.stepIndexOutput.emit(this.stepIndex);
    const propertyValue = event.value.property;
    const typeValue = event.value.type;

    this.eventProperties[index] = {
      ...this.eventProperties[index],
      property: propertyValue,cccccbdgdtnc
      type: typeValue,
    }

    this.eventPropertiesOutput.emit([this.eventProperties, index])
    // this.eventPropertiesOutput.emit(this.eventProperties);
  }

  onOperatorChange(operatorData: EventOperator, index: number) {
    this.stepIndexOutput.emit(this.stepIndex);

    this.eventProps[0].properties[index] = {
      ...this.eventProps[0].properties[index],
      operator: operatorData
    };
    // this.eventProperties = { ...this.eventProperties, operator: operatorData };

    // this.eventPropertiesOutput.emit(this.eventProperties);
  }

  addNewAttribute() {
    this.addEventAttribute.emit();
    // this.step.properties = [...this.step.properties, new EventProperty()];
  }

  getEventProperties(event: MatSelectChange) {
    const filterEventProperties = this.events.filter(
      (option: any) => option.type === event.value
    );
    this.selectedEventProperties = filterEventProperties[0].properties;
    console.log('selected e: ', this.selectedEventProperties);
    // TODO: find a better way how to approach this
  }

  stepDelete() {
    this.removeCurrentStep.emit(this.stepIndex);
  }
}
