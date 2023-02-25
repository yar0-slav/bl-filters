import { Component, Output, EventEmitter, Input  } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { EventOperator } from '../filter.model';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent {
  operator?: EventOperator = new EventOperator();
  @Output() operatorChange = new EventEmitter<EventOperator>();

  onOperatorChange(event: MatSelectChange) {
    this.operator = {...this.operator, operator: event.value.operatorName, type: event.value.operator.type };
    this.operatorChange.emit(this.operator);
  }

  onInputChange(event: any) {
    this.operator = { ...this.operator, value_one: event.target.value, value_two: ''};
    this.operatorChange.emit(this.operator)
  }

  operators: { type: string, values: string[] }[] = [
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
