import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { CurrentEvents } from 'src/app/services/current-event.service';
import {
	EventProperty,
	FilterStep,
	EventsResponseProps,
} from '../filter.model';

@Component({
	selector: 'app-single-step',
	templateUrl: './single-step.component.html',
	styleUrls: ['./single-step.component.scss'],
	providers: [CurrentEvents],
})
export class SingleStepComponent implements OnInit {
	@Input() stepIndex!: number;
	@Input() events: EventsResponseProps[] = [];

	@Input() filterStep!: FilterStep;
	@Output() filterStepOutput = new EventEmitter<FilterStep>();

	@Output() removeCurrentStep = new EventEmitter<number>();
	@Output() filterStepClone = new EventEmitter<number>(); 
	@Output() currentSelectedEvent = new EventEmitter<string>();

	arrayOfEventProperties: EventProperty[] = [];
	selectedProperties: { property: string; type: string }[] = [];
	currentEvent!: string;
	currentProps!: EventsResponseProps[];

	constructor(private CurrentEvent: CurrentEvents) {
		console.log('+++++ constructor start +++++');
		this.CurrentEvent.getCurrentEventName().subscribe(value => {
			console.log('constructor eventName: ', value);
		});

		this.CurrentEvent.getCurrentEventArray().subscribe(value => {
			console.log('constructor getCurrentEventArray', value);
			this.arrayOfEventProperties = value;
		});
		console.log('--- constructor start ---');
	}

	ngOnInit() {
		console.log('+++ ngOnInit start +++');
		this.CurrentEvent.getCurrentEventArray().subscribe(value => {
			console.log('ngOnInit getCurrentEventArray', value);

			this.arrayOfEventProperties = value;
		});

		console.log('------ ngOnInit END ------');
	}

	onEventChange(event: MatSelectChange) {
		this.getEventProperties(event.value);
		this.CurrentEvent.setCurrentEventName(event.value);
		this.CurrentEvent.setCurrentEventArray(this.events)
		let filterStepCopy = structuredClone(this.filterStep);

		filterStepCopy = {
			event: event.value,
			properties: [new EventProperty()],
		};

		this.currentSelectedEvent.emit(event.value);
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
		this.arrayOfEventProperties = filterEventProperties?.properties ?? [];
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

	removeCurrentAttribute(index: number) {
		this.filterStep.properties.splice(index, 1);
	}

	stepClone(index: number) {
		this.filterStepClone.emit(index);
	}

	stepDelete() {
		this.removeCurrentStep.emit(this.stepIndex);
	}

}
