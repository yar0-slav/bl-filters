import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

	@Input() filterStep!: FilterStep;
	@Output() filterStepOutput = new EventEmitter<FilterStep>();

	@Output() removeCurrentStep = new EventEmitter<number>(); 

	arrayOfEventProperties: EventProperty[] = [];
	selectedProperties: { property: string; type: string }[] = [];

	onEventChange(event: MatSelectChange) {
		this.getEventProperties(event.value);

		let filterStepCopy = structuredClone(this.filterStep);

		filterStepCopy = {
			...filterStepCopy,
			event: event.value,
		};

		this.filterStepOutput.emit(filterStepCopy);
	}

	onPropertyChange(event: MatSelectChange, index: number) {
		let filterStepCopy = structuredClone(this.filterStep);

		filterStepCopy.properties[index] = {
			...filterStepCopy.properties[index],
			property: event.value.property,
			type: event.value.type,
		};

		this.filterStepOutput.emit(filterStepCopy);
	}

	onOperatorChange(operatorData: FilterStep) {
		this.filterStepOutput.emit(operatorData);
	}	

	getEventProperties(value: string) {
		const filterEventProperties = this.events.find(
			(option: any) => option.type === value 
		);
		this.arrayOfEventProperties = structuredClone(
			filterEventProperties?.properties ?? []
		);
	}

	propertyObjectComparison(property_one: any, property_two: any) {
		if (property_one.property == property_two.property) {
			return property_one.property;
		}
	}

	addNewAttribute() {
		this.filterStep.properties = [
			...this.filterStep.properties,
			new EventProperty(),
		];
	}

	stepDelete() {
		this.removeCurrentStep.emit(this.stepIndex);
	}
}
