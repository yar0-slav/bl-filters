import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { EventOperator, FilterStep, Operator } from '../filter.model';

@Component({
	selector: 'app-operators',
	templateUrl: './operators.component.html',
	styleUrls: ['./operators.component.scss'],
})
export class OperatorsComponent {
	@Input() currentStepIndex!: any; // TODO: change from any 
	@Input() filterStep!: FilterStep;
	@Output() operatorChange = new EventEmitter<EventOperator[]>();

	operator: EventOperator[] = [];
	currentOperator: any; // TODO: change from any 

	onOperatorChange(event: MatSelectChange) {
		this.operator[this.currentStepIndex] = {
			...this.operator[this.currentStepIndex],
			name: event.value.operatorName,
			type: event.value.operator.type,
		};	

		console.log(this.operator, this.currentStepIndex);

		// console.log('current operator' ,this.currentOperator);
		// this.currentOperator[this.currentStepIndex] = event.value;

		this.operatorChange.emit(this.operator);
	}

	onInputChange(event: Event, propertyToUpdate: keyof Operator): void {
		const inputValue: string = (event.target as HTMLInputElement).value;
		this.operator[this.currentStepIndex] = {
			...this.operator[this.currentStepIndex],
			[propertyToUpdate]: inputValue,
		};
		// this.operatorChange.emit(this.operator);
		console.log(this.operator, this.currentStepIndex);
		console.log('current index: ', this.operator[this.currentStepIndex]);
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
