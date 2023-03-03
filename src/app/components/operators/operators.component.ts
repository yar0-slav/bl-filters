import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { EventOperator, FilterStep, Operator } from '../filter.model';

@Component({
	selector: 'app-operators',
	templateUrl: './operators.component.html',
	styleUrls: ['./operators.component.scss'],
})
export class OperatorsComponent {
	@Input() currentStepIndex!: number; 
	@Input() properties!: any; 

	@Input() filterStep!: FilterStep;
	@Output() filterStepOutput = new EventEmitter<FilterStep>();

	operator: EventOperator[] = [];

	onOperatorChange(event: MatSelectChange) {
		let filterStepCopy = structuredClone(this.filterStep);

		filterStepCopy.properties[this.currentStepIndex].operator = {
			...filterStepCopy.properties[this.currentStepIndex].operator,
			name: event.value.name,
			type: event.value.operator.type,
		};

		this.filterStepOutput.emit(filterStepCopy);
	}

	onInputChange(event: Event, propertyToUpdate: keyof Operator): void {
		let filterStepCopy = structuredClone(this.filterStep);
		
		const inputValue: string = (event.target as HTMLInputElement).value;
		
		filterStepCopy.properties[this.currentStepIndex].operator = {
			...filterStepCopy.properties[this.currentStepIndex].operator,
			[propertyToUpdate]: inputValue,
		};
		this.filterStepOutput.emit(filterStepCopy);
	}

	operatorObjectComparison(property_one: any, property_two: any) {
		if (property_one.name == property_two.name) {
		return property_one.name;
		}
	}

	operators: { type: string; values: string[] }[] = [
		{
			type: 'string',
			values: ['equals', 'does not contain', 'contains', 'does not contains'],
		},
		{
			type: 'number',
			values: ['equal to', 'in between', 'less than', 'greater than'],
		},
	];
}
