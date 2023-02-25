export class FilterStep {
    event: string;
    name: string;
    properties: EventProperty[];

    constructor(event: string = '', name: string = '', properties: EventProperty[] = []) {
        this.event = event;
        this.name = name;
        this.properties = properties;
    }
}

export class EventProperty {
    property: string;
    type: string;
    operator: EventOperator[];

    constructor(property: string = '', type: string, operator: EventOperator[] = []) {
        this.property = property;
        this.type = type;
        this.operator = operator;
    }
}

export class EventOperator {
    operator?: string;
    type?: string;
    value_one?: PropertyValue;
    value_two?: PropertyValue;

    constructor(operator: string = '', type: string = '', value_one: PropertyValue = '', value_two: PropertyValue = '') {
        this.operator = operator;
        this.type = type;
        this.value_one = value_one;
        this.value_two = value_two;    
    }
}


export interface EventsResponse {
    events: EventProperty[];
}

export interface EventProperties {
    properties: string; 
    type: string;
}

export type PropertyValue = string | number | undefined;