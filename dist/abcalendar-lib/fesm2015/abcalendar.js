import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class AbcalendarLibService {
    constructor() { }
}
AbcalendarLibService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AbcalendarLibService_Factory() { return new AbcalendarLibService(); }, token: AbcalendarLibService, providedIn: "root" });
AbcalendarLibService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
AbcalendarLibService.ctorParameters = () => [];

class AbcalendarLibComponent {
    constructor() {
        this.eventEmitter = new EventEmitter();
    }
    ngOnInit() {
    }
    setEvent($event) {
        this.eventEmitter.emit($event);
    }
}
AbcalendarLibComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-abcalendar-lib',
                template: `
    <lib-calendar
      [views]="views"
      [initialView]="initialView"
      [initialDate]="initialDate"
      [events]="events"
      (eventClick)="setEvent($event)"
      [localeValue]="localeValue"
    ></lib-calendar>
  `
            },] }
];
AbcalendarLibComponent.ctorParameters = () => [];
AbcalendarLibComponent.propDecorators = {
    initialView: [{ type: Input }],
    initialDate: [{ type: Input }],
    events: [{ type: Input }],
    views: [{ type: Input }],
    localeValue: [{ type: Input }],
    eventEmitter: [{ type: Output }]
};

class CalendarComponent {
    constructor() {
        this.eventClick = new EventEmitter();
        this.today = new Date(Date.now());
        this.yBtn = false;
        this.mBtn = false;
        this.wBtn = false;
        this.dBtn = false;
        this.defLocales = {
            localeEn: {
                weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                others: ['Year', 'Week', 'Month', 'Day', 'Today', 'All Day'],
                lang: null
            },
            localeDe: {
                weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                months: ['Januar', 'Februar', 'Mrz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'OKtober', 'November', 'Dezember'],
                others: ['Jahr', 'Woche', 'Monat', 'Tag', 'Heute', 'Ganztägig'],
                lang: null
            }
        };
    }
    static setMonthAndDayFormat(day, month) {
        const monthAndDay = [' ', ' '];
        // day
        if (day < 10) {
            monthAndDay[0] = `0${day}`;
        }
        else {
            monthAndDay[0] = day.toString();
        }
        // month
        if (month < 10) {
            monthAndDay[1] = `0${month}`;
        }
        else {
            monthAndDay[1] = month.toString();
        }
        return monthAndDay;
    }
    ngOnInit() {
        this.setInitialView();
        this.setInitialDate();
        this.checkEvents();
        this.prepareButtons();
        this.setLocaleForCalendar();
    }
    getMonthsForLocale(locale) {
        const format = new Intl.DateTimeFormat(locale, { month: 'long' });
        const months = [];
        for (let month = 0; month < 12; month++) {
            const dateToFormat = new Date(Date.UTC(2000, month, 1, 0, 0, 0));
            months.push(format.format(dateToFormat));
        }
        return months;
    }
    getWeekdaysForLocale(locale) {
        const format = new Intl.DateTimeFormat(locale, { weekday: 'long' });
        const weekdays = [];
        for (let weekday = 0; weekday < 6; weekday++) {
            const dateToFormat = new Date(Date.UTC(2000, weekday, 1, 0, 0, 0));
            weekdays.push(format.format(dateToFormat));
        }
        return weekdays;
    }
    numSequence(n) {
        return Array(n);
    }
    getDaysOfMonth(f) {
        let firstDay;
        if (f == null) {
            firstDay = new Date(this.year, this.month + 1, 0);
        }
        else {
            firstDay = new Date(this.year, f + 1, 0);
        }
        return firstDay.getDate();
    }
    getEmptyStartDays(f) {
        let firstDay;
        if (f == null) {
            firstDay = new Date(this.year, this.month, 1);
        }
        else {
            firstDay = new Date(this.year, f, 1);
        }
        switch (firstDay.getDay()) {
            case 0:
                return 6;
            case 1:
                return 0;
            case 2:
                return 1;
            case 3:
                return 2;
            case 4:
                return 3;
            case 5:
                return 4;
            case 6:
                return 5;
        }
    }
    getEmptyEndDays(f) {
        const daysOfMonth = this.getDaysOfMonth(f);
        const getEmptyStartDay = this.getEmptyStartDays(f);
        return 42 - daysOfMonth - getEmptyStartDay;
    }
    prev() {
        if (this.initialView === 'year') {
            this.year--;
        }
        else if (this.initialView === 'month') {
            if (this.month > 0) {
                this.month--;
            }
            else {
                this.month = 11;
                this.year--;
            }
        }
        else if (this.initialView === 'week') {
            if (this.day - 7 < 0) {
                this.day = this.getDaysOfMonth(this.month - 1) + (this.day - 7);
                if (this.month === 0) {
                    this.month = 11;
                    this.year--;
                }
                else {
                    this.month--;
                }
            }
            else {
                this.day = this.day - 7;
            }
        }
        else {
            if (this.day > 1) {
                this.day--;
            }
            else {
                this.month--;
                this.day = this.getDaysOfMonth(this.month);
                if (this.month === 0) {
                    this.day = 31;
                    this.month = 11;
                    this.year--;
                }
            }
        }
    }
    currentDay() {
        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();
        this.day = this.today.getDate();
    }
    next() {
        if (this.initialView === 'year') {
            this.year++;
        }
        else if (this.initialView === 'month') {
            if (this.month < 11) {
                this.month++;
            }
            else {
                this.month = 0;
                this.year++;
            }
        }
        else if (this.initialView === 'week') {
            if (this.day + 7 > this.getDaysOfMonth(this.month)) {
                this.day = this.day + 7 - this.getDaysOfMonth(this.month);
                if (this.month === 11) {
                    this.month = 0;
                    this.year++;
                }
                else {
                    this.month++;
                }
            }
            else {
                this.day = this.day + 7;
            }
        }
        else {
            if (this.day < this.getDaysOfMonth(this.month) - 1) {
                this.day++;
            }
            else {
                this.day = 1;
                if (this.month < 11) {
                    this.month++;
                }
                else {
                    this.month = 0;
                    this.year++;
                }
            }
        }
    }
    setTitle() {
        switch (this.initialView) {
            case 'year':
                return this.year.toString();
            case 'month':
                return `${this.localeValue.months[this.month]} ${this.year.toString()}`;
            case 'week':
                const wholeWeek = this.getWholeWeek();
                const startDate = new Date(this.year, this.month, this.day - wholeWeek[0]);
                const endDate = new Date(this.year, this.month, this.day + wholeWeek[1]);
                const formattedStartDate = CalendarComponent.setMonthAndDayFormat(startDate.getDate() + 1, startDate.getMonth() + 1);
                const formattedEndDate = CalendarComponent.setMonthAndDayFormat(endDate.getDate() + 1, endDate.getMonth() + 1);
                const startDay = `${formattedStartDate[0]}.${formattedStartDate[1]}`;
                const endDay = `${formattedEndDate[0]}.${formattedEndDate[1]}.${endDate.getFullYear()}`;
                return `${startDay} - ${endDay}`;
            case 'day':
                const formattedDate = CalendarComponent.setMonthAndDayFormat(this.day, this.month + 1);
                return `${formattedDate[0]}.${formattedDate[1]}.${this.year}`;
        }
    }
    getItemColor(item) {
        if (item.color == null || !item.color.match(/^#([0-9a-f]{3}){1,2}$/i)) {
            return '#e7e2e2';
        }
        else {
            return item.color;
        }
    }
    getTextColor(backgroundColor) {
        const r = parseInt(backgroundColor.substring(1, 3), 16);
        const g = parseInt(backgroundColor.substring(3, 5), 16);
        const b = parseInt(backgroundColor.substring(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    }
    correctDate(item, day, month) {
        if (month == null) {
            month = this.month;
        }
        const dateToCheck = new Date(this.year, month, day + 1, 1, 0, 0, 0);
        const itemDate = new Date(item.dateOfExpiry);
        const isCurrentDate = itemDate.getFullYear() === dateToCheck.getFullYear() &&
            itemDate.getMonth() === dateToCheck.getMonth() &&
            dateToCheck.getDate() === itemDate.getDate();
        if (isCurrentDate) {
            this.itemCounter++;
            return true;
        }
        else {
            return false;
        }
    }
    isToLate() {
        return this.itemCounter <= 3;
    }
    colorOfTheDay(dayNumber, rightMonth) {
        let a;
        if (rightMonth == null) {
            a = Date.UTC(this.year, new Date(Date.now()).getMonth(), dayNumber + 1);
        }
        else {
            a = Date.UTC(this.year, rightMonth, dayNumber + 1);
        }
        const b = Date.UTC(this.year, this.month, this.today.getDate());
        if (a === b) {
            return '#d0d0f5';
        }
    }
    getHoursOfDay(hours) {
        if (hours >= 10) {
            return hours.toString();
        }
        else {
            return `0${hours}`;
        }
    }
    isAllDayItem(item) {
        return new Date(item.dateOfExpiry).getDate() === this.day;
    }
    getDatesOfWeek(indexDay) {
        const startDate = new Date(this.year, this.month, this.day - this.getWholeWeek()[0]);
        return startDate.getDate() + indexDay;
    }
    resetCounter() {
        this.itemCounter = 0;
    }
    setInitialView() {
        if (this.initialView == null) {
            this.initialView = 'month';
        }
    }
    setInitialDate() {
        let date;
        if (this.initialDate == null) {
            date = new Date(Date.now());
        }
        else {
            date = this.initialDate;
        }
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDate();
    }
    checkEvents() {
        if (this.events === null) {
            console.log('NO EVENTS');
        }
    }
    getWholeWeek() {
        switch (new Date(this.year, this.month, this.day + 1).getDay()) {
            case 0:
                return [6, 0];
            case 1:
                return [0, 6];
            case 2:
                return [1, 5];
            case 3:
                return [2, 4];
            case 4:
                return [3, 3];
            case 5:
                return [4, 2];
            case 6:
                return [5, 1];
        }
    }
    prepareButtons() {
        if (this.views == null) {
            this.mBtn = true;
            this.wBtn = true;
            this.dBtn = true;
            this.yBtn = true;
        }
        else {
            for (const btn of this.views) {
                switch (btn) {
                    case 'year': {
                        this.yBtn = true;
                        break;
                    }
                    case 'month': {
                        this.mBtn = true;
                        break;
                    }
                    case 'week': {
                        this.wBtn = true;
                        break;
                    }
                    case 'day': {
                        this.dBtn = true;
                        break;
                    }
                }
            }
        }
    }
    setLocaleForCalendar() {
        if (this.localeValue == null) {
            this.localeValue = this.defLocales.localeEn;
        }
        else if (this.localeValue.lang === 'en-En' || this.localeValue.lang === 'en-US') {
            this.localeValue = this.defLocales.localeEn;
        }
        else if ('de-De') {
            this.localeValue = this.defLocales.localeDe;
        }
    }
}
CalendarComponent.ɵprov = i0.ɵɵdefineInjectable({ factory: function CalendarComponent_Factory() { return new CalendarComponent(); }, token: CalendarComponent, providedIn: "root" });
CalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-calendar',
                template: "<div class=\"container-fluid\">\r\n  <div class=\"ml-5 mr-5 text-center\">\r\n    <!--  HEADER-->\r\n    <div class=\"row mt-5\">\r\n      <div class=\"col-4\">\r\n        <div class=\"btn-group\" role=\"group\">\r\n          <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"prev()\"> &#60;</button>\r\n          <button type=\"button\" class=\"btn btn-outline-dark\"\r\n                  (click)=\"currentDay()\">{{localeValue.others[4]}}</button>\r\n          <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"next()\">&#62;</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-4 text-center\"><h1>{{setTitle()}}</h1></div>\r\n      <div class=\"col-4\">\r\n        <div class=\"btn-group text-right\" role=\"group\">\r\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"yBtn\"\r\n                  (click)=\"initialView = 'year'; itemCounter = 0\">{{localeValue.others[0]}}</button>\r\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"mBtn\"\r\n                  (click)=\"initialView = 'month'; itemCounter = 0\">{{localeValue.others[2]}}</button>\r\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"wBtn\"\r\n                  (click)=\"initialView = 'week'; itemCounter = 0\">{{localeValue.others[1]}}</button>\r\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"dBtn\"\r\n                  (click)=\"initialView = 'day'; itemCounter = 0\">{{localeValue.others[3]}}</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!--JAHRESANSICHT-->\r\n    <div class=\"row\" *ngIf=\"initialView =='year'\">\r\n      <div *ngFor=\"let column of numSequence(12); let f = index;\" class=\"col-lg-4 mt-3\">\r\n        <div class=\"border\">\r\n          <div class=\"col-12 justify-content-center\">\r\n            <!--            Monthnames-->\r\n            <div class=\"container-fluid text-center\">\r\n              <h5 style=\"font-weight: bolder\">{{localeValue.months[f]}}</h5>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\r\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\r\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\r\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\r\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\r\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\r\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\r\n\r\n              <div *ngFor=\"let beforeDay of numSequence(getEmptyStartDays(f)); let ac = index;\"\r\n                   class=\"border w-14 h-117px lgOnHover\">\r\n              </div>\r\n              <div *ngFor=\"let currentDay of numSequence(getDaysOfMonth(f)); let dayNumber = index;\"\r\n                   class=\"border text-left w-14 h-117px lgOnHover\"\r\n                   [ngStyle]=\"{'background-color': colorOfTheDay(dayNumber, f)}\">\r\n                <div class=\"ml-2\">\r\n                  {{dayNumber + 1}}\r\n                  {{resetCounter()}}\r\n                </div>\r\n                <div *ngFor=\"let item of events\">\r\n                  <div *ngIf=\"itemCounter < 3\">\r\n                    <div *ngIf=\"correctDate(item, dayNumber, f)\" class=\"border border-dark rounded m-1\"\r\n                         [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\r\n                      <div class=\"ml-1 crop pointer\" (click)=\"eventClick.emit(item)\">\r\n                        {{item.title}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div *ngFor=\"let afterDay of numSequence(getEmptyEndDays(f)); let daysOfNextMonth = index;\"\r\n                   class=\"border w-14 h-117px lg lgOnHover\">\r\n                {{daysOfNextMonth + 1}}\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!--MONATSANSICHT-->\r\n    <div *ngIf=\"initialView == 'month'\">\r\n      <div class=\"row\">\r\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\r\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\r\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\r\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\r\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\r\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\r\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\r\n        <div *ngFor=\"let beforeday of numSequence(getEmptyStartDays()); let ac = index;\"\r\n             class=\"border w-14 h-117px lgOnHover\">\r\n        </div>\r\n        <div *ngFor=\"let currentday of numSequence(getDaysOfMonth()); let dayNumber = index\"\r\n             class=\"border text-left w-14 h-117px lgOnHover\" [ngStyle]=\"{'background-color': colorOfTheDay(dayNumber)}\">\r\n          <div class=\"ml-2\">\r\n            {{dayNumber + 1}}\r\n            {{resetCounter()}}\r\n          </div>\r\n          <div *ngFor=\"let item of events\">\r\n            <div *ngIf=\"itemCounter < 3\">\r\n              <div *ngIf=\"correctDate(item, dayNumber)\">\r\n                <div class=\"ml-1 border border-dark rounded m-1 crop pointer\" (click)=\"eventClick.emit(item)\"\r\n                     [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\r\n                  {{item.title}}\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div *ngFor=\"let afterday of numSequence(getEmptyEndDays()); let daysOfNextMonth = index;\"\r\n             class=\"border text-left w-14 h-117px lg lgOnHover\">\r\n          <div class=\"ml-2\">\r\n            {{daysOfNextMonth + 1}}\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!--WOCHENANSICHT-->\r\n    <div *ngIf=\"initialView == 'week'\">\r\n      <div class=\"justify-content-center\">\r\n        <div class=\"border border-light\">\r\n          <div class=\"row\">\r\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\r\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\r\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\r\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\r\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\r\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\r\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div *ngFor=\"let counter of numSequence(7); let days = index\" class=\"w-14 border border-grey week-height lgOnHover\"\r\n               [ngStyle]=\"{'background-color': colorOfTheDay(getDatesOfWeek(days))}\">\r\n            <div *ngFor=\"let item of events\">\r\n              <div *ngIf=\"correctDate(item, getDatesOfWeek(days))\" class=\"m-1\">\r\n                <div class=\"rounded w-100 border border-dark crop pointer\" (click)=\"eventClick.emit(item)\"\r\n                     [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\r\n                  {{item.title}}\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!--TAGESANSICHT-->\r\n    <div *ngIf=\"initialView == 'day'\">\r\n      <div class=\"row justify-content-center\">\r\n        <div class=\"w-100\">\r\n          <div class=\"row\">\r\n            <div class=\"border border-grey w-14 bg-dark min-height\">\r\n              <div class=\"lg\">\r\n                {{localeValue.others[5]}}\r\n              </div>\r\n            </div>\r\n            <div class=\"w-85\">\r\n              <div *ngFor=\"let item of events\">\r\n                <div *ngIf=\"isAllDayItem(item) && correctDate(item, day - 1)\">\r\n                  <div class=\"border border-grey h-50 justify-content-center\">\r\n                    <div class=\"rounded w-100 border border-dark crop pointer\" (click)=\"eventClick.emit(item)\"\r\n                         [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\r\n                      {{item.title}}\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"h-2px\"></div>\r\n          <div *ngFor=\"let counter of numSequence(24); let hours = index; \">\r\n            <div class=\"row\">\r\n              <div class=\"border border-grey w-14 bg-dark h-50px\">\r\n                <div class=\"lg\">\r\n                  {{getHoursOfDay(hours)}}\r\n                </div>\r\n              </div>\r\n              <div class=\"w-85\">\r\n                <div class=\"border border-grey h-50\"></div>\r\n                <div class=\"border border-grey h-50\"></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n  <div class=\"container h-50px\"></div>\r\n</div>\r\n",
                styles: [".w-14{width:14.2857%}.w-85{width:85.7143%}.pointer{cursor:pointer}.h-2px{height:2px}.h-50px{height:50px}.h-100px{height:100px}.h-117px{height:119px}.lg{color:#d3d3d3}.min-height{min-height:50px}.week-height{height:300px}.border-grey{border-color:#8f8f8f}.crop{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lgOnHover:hover{background-color:#f5f5f5}"]
            },] },
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
CalendarComponent.propDecorators = {
    initialView: [{ type: Input }],
    initialDate: [{ type: Input }],
    events: [{ type: Input }],
    views: [{ type: Input }],
    localeValue: [{ type: Input }],
    eventClick: [{ type: Output }]
};
class Item {
}
class List {
}
class Local {
}

class AbcalendarLibModule {
}
AbcalendarLibModule.decorators = [
    { type: NgModule, args: [{
                declarations: [AbcalendarLibComponent, CalendarComponent],
                imports: [
                    CommonModule
                ],
                exports: [AbcalendarLibComponent]
            },] }
];

/*
 * Public API Surface of abcalendar-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AbcalendarLibModule, AbcalendarLibService, CalendarComponent, Item, List, Local, AbcalendarLibComponent as ɵa };
//# sourceMappingURL=abcalendar.js.map
