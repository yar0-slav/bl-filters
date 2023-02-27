import { Component, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { EventOperator, Operator } from '../filter.model';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss'],
})
export class OperatorsComponent {
  operator?: EventOperator = new EventOperator();
  @Output() operatorChange = new EventEmitter<EventOperator>();

  currentOperator: string = '';

  onOperatorChange(event: MatSelectChange) {
    this.operator = {
      ...this.operator,
      name: event.value.operatorName,
      type: event.value.operator.type,
    };
    this.changeCurrentActiveOperator(event.value.operatorName)
    this.operatorChange.emit(this.operator);
  }

  onInputChange(event: Event, propertyToUpdate: keyof Operator): void {
    const inputValue: string = (event.target as HTMLInputElement).value;
    this.operator = {
      ...this.operator,
      [propertyToUpdate]: inputValue,
    };
    this.operatorChange.emit(this.operator);
  }

  changeCurrentActiveOperator(name: string) {
    this.currentOperator = name;
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
