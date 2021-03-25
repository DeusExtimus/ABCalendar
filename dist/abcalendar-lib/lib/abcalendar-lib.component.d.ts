import { EventEmitter, OnInit } from '@angular/core';
import { Item, Local } from './calendar/calendar.component';
export declare class AbcalendarLibComponent implements OnInit {
    constructor();
    initialView: string;
    initialDate: Date;
    events: Item[];
    views: string[];
    localeValue: Local;
    eventEmitter: EventEmitter<Item>;
    ngOnInit(): void;
    setEvent($event: Item): void;
}
