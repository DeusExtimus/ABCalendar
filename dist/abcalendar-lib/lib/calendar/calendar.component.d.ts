import { OnInit, EventEmitter } from '@angular/core';
export declare class CalendarComponent implements OnInit {
    initialView: string;
    initialDate: Date;
    events: Item[];
    views: string[];
    localeValue: Local;
    eventClick: EventEmitter<Item>;
    today: Date;
    year: number;
    month: number;
    day: number;
    yBtn: boolean;
    mBtn: boolean;
    wBtn: boolean;
    dBtn: boolean;
    itemCounter: number;
    private static setMonthAndDayFormat;
    ngOnInit(): void;
    numSequence(n: number): Array<number>;
    getDaysOfMonth(f?: number): number;
    getEmptyStartDays(f?: number): number;
    getEmptyEndDays(f?: number): number;
    prev(): void;
    currentDay(): void;
    next(): void;
    setTitle(): string;
    getItemColor(item: Item): string;
    getTextColor(backgroundColor: string): string;
    correctDate(item: Item, day: number, month?: number): boolean;
    isToLate(): boolean;
    colorOfTheDay(dayNumber: number, rightMonth?: number): string;
    getHoursOfDay(hours: number): string;
    isAllDayItem(item: Item): boolean;
    getDatesOfWeek(indexDay: number): number;
    resetCounter(): void;
    private setInitialView;
    private setInitialDate;
    private checkEvents;
    private getWholeWeek;
    private prepareButtons;
}
export declare class Item {
    itemId?: number;
    list?: List;
    title: string;
    color?: string;
    dateOfExpiry: Date;
}
export declare class List {
    listId?: number;
    item?: Item[];
    title?: string | undefined;
    dateOfExpiry?: Date;
}
export declare class Local {
    weekdays?: string[];
    months?: string[];
    others?: string[];
}
