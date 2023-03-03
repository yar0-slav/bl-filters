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
	@Input() stepIndex!: number;

	@Output() eventPropertiesOutput = new EventEmitter<[any, any]>(); // TODO: change from any 
	@Output() eventNameOutput = new EventEmitter<string>();
	@Output() stepIndexOutput = new EventEmitter<number>();
	@Output() removeCurrentStep = new EventEmitter<any>(); // TODO: change from any
	@Output() addEventAttribute = new EventEmitter<any>(); // TODO: change from any

	@Input() filterStep!: FilterStep;
	@Output() filterStepOutput = new EventEmitter<FilterStep>();

	eventProperties: EventProperty[] = [new EventProperty()];
	eventProps: FilterStep[] = [new FilterStep()];

	selectedEvent: string = '';
	arrayOfEventProperties: EventProperty[] = [];
	selectedProperties: { property: string; type: string }[] = [];

	stepChange(data: any, propertyName: any) { // TODO: change from any 
		let filterStepCopy = structuredClone(this.filterStep);
		console.log('data ', data, 'prop name ', propertyName);
		
		filterStepCopy = {
			...filterStepCopy,
			[propertyName]: data,
		};
		console.log('filterstepCopy', filterStepCopy);
		this.filterStepOutput.emit(filterStepCopy);
	}

	onEventChange(event: MatSelectChange) {
		this.stepIndexOutput.emit(this.stepIndex);
		this.getEventProperties(event.value);
		console.log('evnet props', this.arrayOfEventProperties);

		this.stepChange(event.value, 'event');
	}

	onPropertyChange(event: MatSelectChange, index: number) {
		this.stepIndexOutput.emit(this.stepIndex);

		// this.stepChange(event.value, 'properties')

		// const propertyValue = event.value.property;
		// const typeValue = event.value.type;

		// this.selectedProperties[index] = event.value;

		// this.eventProperties[index] = {
		// 	...this.eventProperties[index],
		// 	property: propertyValue,
		// 	type: typeValue,
		// };

		// this.eventPropertiesOutput.emit([this.eventProperties, index]);
	}

	onOperatorChange(operatorData: EventOperator[], index: number) {
		// this.stepIndexOutput.emit(this.stepIndex);

		// this.eventProperties[index] = {
		// 	...this.eventProperties[index],
		// 	operator: operatorData[index],
		// };

		// console.log('event props', this.eventProperties);

		// this.eventPropertiesOutput.emit([this.eventProperties, index]);
	}

	addNewAttribute() {
		this.filterStep.properties = [
			...this.filterStep.properties,
			new EventProperty(),
		];
	}

	getEventProperties(value: string) {
		const filterEventProperties = this.events.filter(
			(option: any) => option.type === value // TODO: change from any 
		);
		this.arrayOfEventProperties = filterEventProperties[0].properties;
	}

	stepDelete() {
		// this.removeCurrentStep.emit(this.stepIndex);
	}
}
