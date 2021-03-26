import { Component, Input, Output, EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CalendarComponent {
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
export class Item {
}
export class List {
}
export class Local {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL25pY2xhcy5sYW5nL0Rlc2t0b3AvS2FsZW5kZXIvR2l0aHViL0FCQ2FsZW5kYXIvcHJvamVjdHMvYWJjYWxlbmRhci1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFTekYsTUFBTSxPQUFPLGlCQUFpQjtJQVA5QjtRQXNCRSxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUV0QyxVQUFLLEdBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFLbkMsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUliLGVBQVUsR0FBRztZQUNYLFFBQVEsRUFBRTtnQkFDUixRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7Z0JBQzNELE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO2dCQUNsSSxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQztnQkFDNUQsSUFBSSxFQUFFLElBQUk7YUFDWDtZQUNE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VyxJQUFJLElBQUksRUFBRTtZQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQzdDO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ2pGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDN0M7YUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQzdDO0lBQ0gsQ0FBQzs7OztZQTNZRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLDJrVUFBd0M7O2FBRXpDO1lBRUEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7OzBCQUc3QixLQUFLOzBCQUVMLEtBQUs7cUJBRUwsS0FBSztvQkFFTCxLQUFLOzBCQUdMLEtBQUs7eUJBR0wsTUFBTTs7QUF5WFQsTUFBTSxPQUFPLElBQUk7Q0FNaEI7QUFFRCxNQUFNLE9BQU8sSUFBSTtDQUtoQjtBQUVELE1BQU0sT0FBTyxLQUFLO0NBS2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGliLWNhbGVuZGFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgaW5pdGlhbFZpZXc6IHN0cmluZztcclxuICBASW5wdXQoKVxyXG4gIGluaXRpYWxEYXRlOiBEYXRlO1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRzOiBJdGVtW107XHJcbiAgQElucHV0KClcclxuICB2aWV3czogc3RyaW5nW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgbG9jYWxlVmFsdWU6IExvY2FsO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBldmVudENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxJdGVtPigpO1xyXG5cclxuICB0b2RheTogRGF0ZSA9IG5ldyBEYXRlKERhdGUubm93KCkpO1xyXG4gIHllYXI6IG51bWJlcjtcclxuICBtb250aDogbnVtYmVyO1xyXG4gIGRheTogbnVtYmVyO1xyXG5cclxuICB5QnRuID0gZmFsc2U7XHJcbiAgbUJ0biA9IGZhbHNlO1xyXG4gIHdCdG4gPSBmYWxzZTtcclxuICBkQnRuID0gZmFsc2U7XHJcblxyXG4gIGl0ZW1Db3VudGVyOiBudW1iZXI7XHJcblxyXG4gIGRlZkxvY2FsZXMgPSB7XHJcbiAgICBsb2NhbGVFbjoge1xyXG4gICAgICB3ZWVrZGF5czogWydNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCcsICdTdW4nXSxcclxuICAgICAgbW9udGhzOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXSxcclxuICAgICAgb3RoZXJzOiBbJ1llYXInLCAnV2VlaycsICdNb250aCcsICdEYXknLCAnVG9kYXknLCAnQWxsIERheSddLFxyXG4gICAgICBsYW5nOiBudWxsXHJcbiAgICB9LFxyXG4gICAgbG9jYWxlRGU6IHtcclxuICAgICAgd2Vla2RheXM6IFsnTW8nLCAnRGknLCAnTWknLCAnRG8nLCAnRnInLCAnU2EnLCAnU28nXSxcclxuICAgICAgbW9udGhzOiBbJ0phbnVhcicsICdGZWJydWFyJywgJ01yeicsICdBcHJpbCcsICdNYWknLCAnSnVuaScsICdKdWxpJywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT0t0b2JlcicsICdOb3ZlbWJlcicsICdEZXplbWJlciddLFxyXG4gICAgICBvdGhlcnM6IFsnSmFocicsICdXb2NoZScsICdNb25hdCcsICdUYWcnLCAnSGV1dGUnLCAnR2FuenTDpGdpZyddLFxyXG4gICAgICBsYW5nOiBudWxsXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgc2V0TW9udGhBbmREYXlGb3JtYXQoZGF5OiBudW1iZXIsIG1vbnRoOiBudW1iZXIpOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCBtb250aEFuZERheTogc3RyaW5nW10gPSBbJyAnLCAnICddO1xyXG4gICAgLy8gZGF5XHJcbiAgICBpZiAoZGF5IDwgMTApIHtcclxuICAgICAgbW9udGhBbmREYXlbMF0gPSBgMCR7ZGF5fWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtb250aEFuZERheVswXSA9IGRheS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgLy8gbW9udGhcclxuICAgIGlmIChtb250aCA8IDEwKSB7XHJcbiAgICAgIG1vbnRoQW5kRGF5WzFdID0gYDAke21vbnRofWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtb250aEFuZERheVsxXSA9IG1vbnRoLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbW9udGhBbmREYXk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0SW5pdGlhbFZpZXcoKTtcclxuICAgIHRoaXMuc2V0SW5pdGlhbERhdGUoKTtcclxuICAgIHRoaXMuY2hlY2tFdmVudHMoKTtcclxuICAgIHRoaXMucHJlcGFyZUJ1dHRvbnMoKTtcclxuICAgIHRoaXMuc2V0TG9jYWxlRm9yQ2FsZW5kYXIoKTtcclxuICB9XHJcblxyXG4gIGdldE1vbnRoc0ZvckxvY2FsZShsb2NhbGUpOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCBmb3JtYXQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHttb250aDogJ2xvbmcnfSk7XHJcbiAgICBjb25zdCBtb250aHMgPSBbXTtcclxuICAgIGZvciAobGV0IG1vbnRoID0gMDsgbW9udGggPCAxMjsgbW9udGgrKykge1xyXG4gICAgICBjb25zdCBkYXRlVG9Gb3JtYXQgPSBuZXcgRGF0ZShEYXRlLlVUQygyMDAwLCBtb250aCwgMSwgMCwgMCwgMCkpO1xyXG4gICAgICBtb250aHMucHVzaChmb3JtYXQuZm9ybWF0KGRhdGVUb0Zvcm1hdCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1vbnRocztcclxuICB9XHJcblxyXG4gIGdldFdlZWtkYXlzRm9yTG9jYWxlKGxvY2FsZSk6IHN0cmluZ1tdIHtcclxuICAgIGNvbnN0IGZvcm1hdCA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwge3dlZWtkYXk6ICdsb25nJ30pO1xyXG4gICAgY29uc3Qgd2Vla2RheXMgPSBbXTtcclxuICAgIGZvciAobGV0IHdlZWtkYXkgPSAwOyB3ZWVrZGF5IDwgNjsgd2Vla2RheSsrKSB7XHJcbiAgICAgIGNvbnN0IGRhdGVUb0Zvcm1hdCA9IG5ldyBEYXRlKERhdGUuVVRDKDIwMDAsIHdlZWtkYXksIDEsIDAsIDAsIDApKTtcclxuICAgICAgd2Vla2RheXMucHVzaChmb3JtYXQuZm9ybWF0KGRhdGVUb0Zvcm1hdCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdlZWtkYXlzO1xyXG4gIH1cclxuXHJcbiAgbnVtU2VxdWVuY2UobjogbnVtYmVyKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICByZXR1cm4gQXJyYXkobik7XHJcbiAgfVxyXG5cclxuICBnZXREYXlzT2ZNb250aChmPzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGxldCBmaXJzdERheTogRGF0ZTtcclxuICAgIGlmIChmID09IG51bGwpIHtcclxuICAgICAgZmlyc3REYXkgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGggKyAxLCAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZpcnN0RGF5ID0gbmV3IERhdGUodGhpcy55ZWFyLCBmICsgMSwgMCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmlyc3REYXkuZ2V0RGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RW1wdHlTdGFydERheXMoZj86IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBsZXQgZmlyc3REYXk6IERhdGU7XHJcbiAgICBpZiAoZiA9PSBudWxsKSB7XHJcbiAgICAgIGZpcnN0RGF5ID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZpcnN0RGF5ID0gbmV3IERhdGUodGhpcy55ZWFyLCBmLCAxKTtcclxuICAgIH1cclxuICAgIHN3aXRjaCAoZmlyc3REYXkuZ2V0RGF5KCkpIHtcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIHJldHVybiA2O1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIHJldHVybiAyO1xyXG4gICAgICBjYXNlIDQ6XHJcbiAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgIGNhc2UgNTpcclxuICAgICAgICByZXR1cm4gNDtcclxuICAgICAgY2FzZSA2OlxyXG4gICAgICAgIHJldHVybiA1O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RW1wdHlFbmREYXlzKGY/OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgZGF5c09mTW9udGggPSB0aGlzLmdldERheXNPZk1vbnRoKGYpO1xyXG4gICAgY29uc3QgZ2V0RW1wdHlTdGFydERheSA9IHRoaXMuZ2V0RW1wdHlTdGFydERheXMoZik7XHJcbiAgICByZXR1cm4gNDIgLSBkYXlzT2ZNb250aCAtIGdldEVtcHR5U3RhcnREYXk7XHJcbiAgfVxyXG5cclxuICBwcmV2KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaW5pdGlhbFZpZXcgPT09ICd5ZWFyJykge1xyXG4gICAgICB0aGlzLnllYXItLTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pbml0aWFsVmlldyA9PT0gJ21vbnRoJykge1xyXG4gICAgICBpZiAodGhpcy5tb250aCA+IDApIHtcclxuICAgICAgICB0aGlzLm1vbnRoLS07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb250aCA9IDExO1xyXG4gICAgICAgIHRoaXMueWVhci0tO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdGlhbFZpZXcgPT09ICd3ZWVrJykge1xyXG4gICAgICBpZiAodGhpcy5kYXkgLSA3IDwgMCkge1xyXG4gICAgICAgIHRoaXMuZGF5ID0gdGhpcy5nZXREYXlzT2ZNb250aCh0aGlzLm1vbnRoIC0gMSkgKyAodGhpcy5kYXkgLSA3KTtcclxuICAgICAgICBpZiAodGhpcy5tb250aCA9PT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5tb250aCA9IDExO1xyXG4gICAgICAgICAgdGhpcy55ZWFyLS07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubW9udGgtLTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kYXkgPSB0aGlzLmRheSAtIDc7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmRheSA+IDEpIHtcclxuICAgICAgICB0aGlzLmRheS0tO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9udGgtLTtcclxuICAgICAgICB0aGlzLmRheSA9IHRoaXMuZ2V0RGF5c09mTW9udGgodGhpcy5tb250aCk7XHJcbiAgICAgICAgaWYgKHRoaXMubW9udGggPT09IDApIHtcclxuICAgICAgICAgIHRoaXMuZGF5ID0gMzE7XHJcbiAgICAgICAgICB0aGlzLm1vbnRoID0gMTE7XHJcbiAgICAgICAgICB0aGlzLnllYXItLTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGN1cnJlbnREYXkoKTogdm9pZCB7XHJcbiAgICB0aGlzLnllYXIgPSB0aGlzLnRvZGF5LmdldEZ1bGxZZWFyKCk7XHJcbiAgICB0aGlzLm1vbnRoID0gdGhpcy50b2RheS5nZXRNb250aCgpO1xyXG4gICAgdGhpcy5kYXkgPSB0aGlzLnRvZGF5LmdldERhdGUoKTtcclxuICB9XHJcblxyXG4gIG5leHQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pbml0aWFsVmlldyA9PT0gJ3llYXInKSB7XHJcbiAgICAgIHRoaXMueWVhcisrO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmluaXRpYWxWaWV3ID09PSAnbW9udGgnKSB7XHJcbiAgICAgIGlmICh0aGlzLm1vbnRoIDwgMTEpIHtcclxuICAgICAgICB0aGlzLm1vbnRoKys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb250aCA9IDA7XHJcbiAgICAgICAgdGhpcy55ZWFyKys7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5pbml0aWFsVmlldyA9PT0gJ3dlZWsnKSB7XHJcbiAgICAgIGlmICh0aGlzLmRheSArIDcgPiB0aGlzLmdldERheXNPZk1vbnRoKHRoaXMubW9udGgpKSB7XHJcbiAgICAgICAgdGhpcy5kYXkgPSB0aGlzLmRheSArIDcgLSB0aGlzLmdldERheXNPZk1vbnRoKHRoaXMubW9udGgpO1xyXG4gICAgICAgIGlmICh0aGlzLm1vbnRoID09PSAxMSkge1xyXG4gICAgICAgICAgdGhpcy5tb250aCA9IDA7XHJcbiAgICAgICAgICB0aGlzLnllYXIrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5tb250aCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmRheSA9IHRoaXMuZGF5ICsgNztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuZGF5IDwgdGhpcy5nZXREYXlzT2ZNb250aCh0aGlzLm1vbnRoKSAtIDEpIHtcclxuICAgICAgICB0aGlzLmRheSsrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGF5ID0gMTtcclxuICAgICAgICBpZiAodGhpcy5tb250aCA8IDExKSB7XHJcbiAgICAgICAgICB0aGlzLm1vbnRoKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubW9udGggPSAwO1xyXG4gICAgICAgICAgdGhpcy55ZWFyKys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRUaXRsZSgpOiBzdHJpbmcge1xyXG4gICAgc3dpdGNoICh0aGlzLmluaXRpYWxWaWV3KSB7XHJcbiAgICAgIGNhc2UgJ3llYXInOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnllYXIudG9TdHJpbmcoKTtcclxuICAgICAgY2FzZSAnbW9udGgnOlxyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLmxvY2FsZVZhbHVlLm1vbnRoc1t0aGlzLm1vbnRoXX0gJHt0aGlzLnllYXIudG9TdHJpbmcoKX1gO1xyXG4gICAgICBjYXNlICd3ZWVrJzpcclxuICAgICAgICBjb25zdCB3aG9sZVdlZWsgPSB0aGlzLmdldFdob2xlV2VlaygpO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy5kYXkgLSB3aG9sZVdlZWtbMF0pO1xyXG4gICAgICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIHRoaXMuZGF5ICsgd2hvbGVXZWVrWzFdKTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRTdGFydERhdGUgPSBDYWxlbmRhckNvbXBvbmVudC5zZXRNb250aEFuZERheUZvcm1hdChzdGFydERhdGUuZ2V0RGF0ZSgpICsgMSwgc3RhcnREYXRlLmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRFbmREYXRlID0gQ2FsZW5kYXJDb21wb25lbnQuc2V0TW9udGhBbmREYXlGb3JtYXQoZW5kRGF0ZS5nZXREYXRlKCkgKyAxLCBlbmREYXRlLmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICBjb25zdCBzdGFydERheSA9IGAke2Zvcm1hdHRlZFN0YXJ0RGF0ZVswXX0uJHtmb3JtYXR0ZWRTdGFydERhdGVbMV19YDtcclxuICAgICAgICBjb25zdCBlbmREYXkgPSBgJHtmb3JtYXR0ZWRFbmREYXRlWzBdfS4ke2Zvcm1hdHRlZEVuZERhdGVbMV19LiR7ZW5kRGF0ZS5nZXRGdWxsWWVhcigpfWA7XHJcbiAgICAgICAgcmV0dXJuIGAke3N0YXJ0RGF5fSAtICR7ZW5kRGF5fWA7XHJcbiAgICAgIGNhc2UgJ2RheSc6XHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IENhbGVuZGFyQ29tcG9uZW50LnNldE1vbnRoQW5kRGF5Rm9ybWF0KHRoaXMuZGF5LCB0aGlzLm1vbnRoICsgMSk7XHJcbiAgICAgICAgcmV0dXJuIGAke2Zvcm1hdHRlZERhdGVbMF19LiR7Zm9ybWF0dGVkRGF0ZVsxXX0uJHt0aGlzLnllYXJ9YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEl0ZW1Db2xvcihpdGVtOiBJdGVtKTogc3RyaW5nIHtcclxuICAgIGlmIChpdGVtLmNvbG9yID09IG51bGwgfHwgIWl0ZW0uY29sb3IubWF0Y2goL14jKFswLTlhLWZdezN9KXsxLDJ9JC9pKSkge1xyXG4gICAgICByZXR1cm4gJyNlN2UyZTInO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGl0ZW0uY29sb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRUZXh0Q29sb3IoYmFja2dyb3VuZENvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgciA9IHBhcnNlSW50KGJhY2tncm91bmRDb2xvci5zdWJzdHJpbmcoMSwgMyksIDE2KTtcclxuICAgIGNvbnN0IGcgPSBwYXJzZUludChiYWNrZ3JvdW5kQ29sb3Iuc3Vic3RyaW5nKDMsIDUpLCAxNik7XHJcbiAgICBjb25zdCBiID0gcGFyc2VJbnQoYmFja2dyb3VuZENvbG9yLnN1YnN0cmluZyg1LCA3KSwgMTYpO1xyXG4gICAgY29uc3QgbHVtaW5hbmNlID0gKDAuMjk5ICogciArIDAuNTg3ICogZyArIDAuMTE0ICogYikgLyAyNTU7XHJcbiAgICByZXR1cm4gbHVtaW5hbmNlID4gMC41ID8gJyMwMDAwMDAnIDogJyNGRkZGRkYnO1xyXG4gIH1cclxuXHJcbiAgY29ycmVjdERhdGUoaXRlbTogSXRlbSwgZGF5OiBudW1iZXIsIG1vbnRoPzogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICBpZiAobW9udGggPT0gbnVsbCkge1xyXG4gICAgICBtb250aCA9IHRoaXMubW9udGg7XHJcbiAgICB9XHJcbiAgICBjb25zdCBkYXRlVG9DaGVjayA9IG5ldyBEYXRlKHRoaXMueWVhciwgbW9udGgsIGRheSArIDEsIDEsIDAsIDAsIDApO1xyXG4gICAgY29uc3QgaXRlbURhdGUgPSBuZXcgRGF0ZShpdGVtLmRhdGVPZkV4cGlyeSk7XHJcbiAgICBjb25zdCBpc0N1cnJlbnREYXRlID1cclxuICAgICAgaXRlbURhdGUuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZVRvQ2hlY2suZ2V0RnVsbFllYXIoKSAmJlxyXG4gICAgICBpdGVtRGF0ZS5nZXRNb250aCgpID09PSBkYXRlVG9DaGVjay5nZXRNb250aCgpICYmXHJcbiAgICAgIGRhdGVUb0NoZWNrLmdldERhdGUoKSA9PT0gaXRlbURhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgaWYgKGlzQ3VycmVudERhdGUpIHtcclxuICAgICAgdGhpcy5pdGVtQ291bnRlcisrO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzVG9MYXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaXRlbUNvdW50ZXIgPD0gMztcclxuICB9XHJcblxyXG4gIGNvbG9yT2ZUaGVEYXkoZGF5TnVtYmVyOiBudW1iZXIsIHJpZ2h0TW9udGg/OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IGE7XHJcbiAgICBpZiAocmlnaHRNb250aCA9PSBudWxsKSB7XHJcbiAgICAgIGEgPSBEYXRlLlVUQyh0aGlzLnllYXIsIG5ldyBEYXRlKERhdGUubm93KCkpLmdldE1vbnRoKCksIGRheU51bWJlciArIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYSA9IERhdGUuVVRDKHRoaXMueWVhciwgcmlnaHRNb250aCwgZGF5TnVtYmVyICsgMSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBiID0gRGF0ZS5VVEModGhpcy55ZWFyLCB0aGlzLm1vbnRoLCB0aGlzLnRvZGF5LmdldERhdGUoKSk7XHJcbiAgICBpZiAoYSA9PT0gYikge1xyXG4gICAgICByZXR1cm4gJyNkMGQwZjUnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SG91cnNPZkRheShob3VyczogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGlmIChob3VycyA+PSAxMCkge1xyXG4gICAgICByZXR1cm4gaG91cnMudG9TdHJpbmcoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBgMCR7aG91cnN9YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzQWxsRGF5SXRlbShpdGVtOiBJdGVtKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoaXRlbS5kYXRlT2ZFeHBpcnkpLmdldERhdGUoKSA9PT0gdGhpcy5kYXk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRlc09mV2VlayhpbmRleERheTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy5kYXkgLSB0aGlzLmdldFdob2xlV2VlaygpWzBdKTtcclxuICAgIHJldHVybiBzdGFydERhdGUuZ2V0RGF0ZSgpICsgaW5kZXhEYXk7XHJcbiAgfVxyXG5cclxuICByZXNldENvdW50ZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLml0ZW1Db3VudGVyID0gMDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0SW5pdGlhbFZpZXcoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pbml0aWFsVmlldyA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbFZpZXcgPSAnbW9udGgnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRJbml0aWFsRGF0ZSgpOiB2b2lkIHtcclxuICAgIGxldCBkYXRlOiBEYXRlO1xyXG4gICAgaWYgKHRoaXMuaW5pdGlhbERhdGUgPT0gbnVsbCkge1xyXG4gICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYXRlID0gdGhpcy5pbml0aWFsRGF0ZTtcclxuICAgIH1cclxuICAgIHRoaXMueWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgIHRoaXMubW9udGggPSBkYXRlLmdldE1vbnRoKCk7XHJcbiAgICB0aGlzLmRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGVja0V2ZW50cygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmV2ZW50cyA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnTk8gRVZFTlRTJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFdob2xlV2VlaygpOiBudW1iZXJbXSB7XHJcbiAgICBzd2l0Y2ggKG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy5kYXkgKyAxKS5nZXREYXkoKSkge1xyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgICAgcmV0dXJuIFs2LCAwXTtcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIHJldHVybiBbMCwgNl07XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICByZXR1cm4gWzEsIDVdO1xyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgcmV0dXJuIFsyLCA0XTtcclxuICAgICAgY2FzZSA0OlxyXG4gICAgICAgIHJldHVybiBbMywgM107XHJcbiAgICAgIGNhc2UgNTpcclxuICAgICAgICByZXR1cm4gWzQsIDJdO1xyXG4gICAgICBjYXNlIDY6XHJcbiAgICAgICAgcmV0dXJuIFs1LCAxXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHJlcGFyZUJ1dHRvbnMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy52aWV3cyA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubUJ0biA9IHRydWU7XHJcbiAgICAgIHRoaXMud0J0biA9IHRydWU7XHJcbiAgICAgIHRoaXMuZEJ0biA9IHRydWU7XHJcbiAgICAgIHRoaXMueUJ0biA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGNvbnN0IGJ0biBvZiB0aGlzLnZpZXdzKSB7XHJcbiAgICAgICAgc3dpdGNoIChidG4pIHtcclxuICAgICAgICAgIGNhc2UgJ3llYXInOiB7XHJcbiAgICAgICAgICAgIHRoaXMueUJ0biA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2FzZSAnbW9udGgnOiB7XHJcbiAgICAgICAgICAgIHRoaXMubUJ0biA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY2FzZSAnd2Vlayc6IHtcclxuICAgICAgICAgICAgdGhpcy53QnRuID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXNlICdkYXknOiB7XHJcbiAgICAgICAgICAgIHRoaXMuZEJ0biA9IHRydWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRMb2NhbGVGb3JDYWxlbmRhcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmxvY2FsZVZhbHVlID09IG51bGwpIHtcclxuICAgICAgdGhpcy5sb2NhbGVWYWx1ZSA9IHRoaXMuZGVmTG9jYWxlcy5sb2NhbGVFbjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5sb2NhbGVWYWx1ZS5sYW5nID09PSAnZW4tRW4nIHx8IHRoaXMubG9jYWxlVmFsdWUubGFuZyA9PT0gJ2VuLVVTJykge1xyXG4gICAgICB0aGlzLmxvY2FsZVZhbHVlID0gdGhpcy5kZWZMb2NhbGVzLmxvY2FsZUVuO1xyXG4gICAgfSBlbHNlIGlmICgnZGUtRGUnKSB7XHJcbiAgICAgIHRoaXMubG9jYWxlVmFsdWUgPSB0aGlzLmRlZkxvY2FsZXMubG9jYWxlRGU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSXRlbSB7XHJcbiAgaXRlbUlkPzogbnVtYmVyO1xyXG4gIGxpc3Q/OiBMaXN0O1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgY29sb3I/OiBzdHJpbmc7XHJcbiAgZGF0ZU9mRXhwaXJ5OiBEYXRlO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGlzdCB7XHJcbiAgbGlzdElkPzogbnVtYmVyO1xyXG4gIGl0ZW0/OiBJdGVtW107XHJcbiAgdGl0bGU/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgZGF0ZU9mRXhwaXJ5PzogRGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvY2FsIHtcclxuICB3ZWVrZGF5cyA/OiBzdHJpbmdbXTtcclxuICBtb250aHMgPzogc3RyaW5nW107XHJcbiAgb3RoZXJzID86IHN0cmluZ1tdO1xyXG4gIGxhbmcgPzogc3RyaW5nO1xyXG59XHJcbiJdfQ==