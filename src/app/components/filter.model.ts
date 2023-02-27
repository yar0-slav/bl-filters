    export interface EventsResponse {
        events: EventsResponseProps[];
    }

    export interface EventsResponseProps {
        properties: EventProperty[]; 
        type: string;
    }

    export class Filter {
        filterSteps: FilterStep[];

        constructor(filterSteps: FilterStep[] = []) {
            this.filterSteps = filterSteps;
        }
    }

    export class FilterStep {
        event: string;
        properties: EventProperty[];

        constructor(event: string = '', properties: EventProperty[] = [new EventProperty()]) {
            this.event = event;
            this.properties = properties;
        }
    }

    export class EventProperty {
        property?: string;
        type?: string;
        operator?: EventOperator;

        constructor(property: string = '', type: string = '',  operator: EventOperator = new EventOperator()) {
            this.property = property;
            this.type = type;
            this.operator = operator;
        }
    }

    export class EventOperator {
        name?: string;
        type?: string;
        value_one?: PropertyValue;
        value_two?: PropertyValue;

        constructor(name: string = '', type: string = '', value_one: PropertyValue = '', value_two: PropertyValue = '') {
            this.name = name;
            this.type = type;
            this.value_one = value_one;
            this.value_two = value_two;    
        }
    }

    export interface Operator {
        value_one: string;
        value_two: string;
    }


    export type PropertyValue = string | number | undefined;