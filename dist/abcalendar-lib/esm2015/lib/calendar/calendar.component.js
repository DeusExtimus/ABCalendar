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
            return '#ececf5';
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
                template: "<div class=\"container-fluid\">\n  <div class=\"ml-5 mr-5 text-center\">\n    <!--  HEADER-->\n    <div class=\"row mt-5\">\n      <div class=\"col-4\">\n        <div class=\"btn-group\" role=\"group\">\n          <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"prev()\"> &#60;</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\"\n                  (click)=\"currentDay()\">{{localeValue.others[4]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"next()\">&#62;</button>\n        </div>\n      </div>\n      <div class=\"col-4 text-center\"><h1>{{setTitle()}}</h1></div>\n      <div class=\"col-4\">\n        <div class=\"btn-group text-right\" role=\"group\">\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"yBtn\"\n                  (click)=\"initialView = 'year'; itemCounter = 0\">{{localeValue.others[0]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"mBtn\"\n                  (click)=\"initialView = 'month'; itemCounter = 0\">{{localeValue.others[2]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"wBtn\"\n                  (click)=\"initialView = 'week'; itemCounter = 0\">{{localeValue.others[1]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"dBtn\"\n                  (click)=\"initialView = 'day'; itemCounter = 0\">{{localeValue.others[3]}}</button>\n        </div>\n      </div>\n    </div>\n\n    <!--JAHRESANSICHT-->\n    <div class=\"row\" *ngIf=\"initialView =='year'\">\n      <div *ngFor=\"let column of numSequence(12); let f = index;\" class=\"col-lg-4 mt-3\">\n        <div class=\"border\">\n          <div class=\"col-12 justify-content-center\">\n            <!--            Monthnames-->\n            <div class=\"container-fluid text-center\">\n              <h5 style=\"font-weight: bolder\">{{localeValue.months[f]}}</h5>\n            </div>\n            <div class=\"row\">\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\n\n              <div *ngFor=\"let beforeDay of numSequence(getEmptyStartDays(f)); let ac = index;\"\n                   class=\"border w-14 h-117px\">\n              </div>\n              <div *ngFor=\"let currentDay of numSequence(getDaysOfMonth(f)); let dayNumber = index;\"\n                   class=\"border text-left w-14 h-117px\"\n                   [ngStyle]=\"{'background-color': colorOfTheDay(dayNumber, f)}\">\n                <div class=\"ml-2\">\n                  {{dayNumber + 1}}\n                  {{resetCounter()}}\n                </div>\n                <div *ngFor=\"let item of events\">\n                  <div *ngIf=\"itemCounter < 3\">\n                    <div *ngIf=\"correctDate(item, dayNumber, f)\" class=\"border border-dark rounded m-1\"\n                         [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                      <div class=\"ml-1 crop pointer\" (click)=\"eventClick.emit(item)\">\n                        {{item.title}}\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div *ngFor=\"let afterDay of numSequence(getEmptyEndDays(f)); let daysOfNextMonth = index;\"\n                   class=\"border w-14 h-117px lg\">\n                {{daysOfNextMonth + 1}}\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!--MONATSANSICHT-->\n    <div *ngIf=\"initialView == 'month'\">\n      <div class=\"row\">\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\n        <div *ngFor=\"let beforeday of numSequence(getEmptyStartDays()); let ac = index;\"\n             class=\"border w-14 h-117px\">\n        </div>\n        <div *ngFor=\"let currentday of numSequence(getDaysOfMonth()); let dayNumber = index\"\n             class=\"border text-left w-14 h-117px\" [ngStyle]=\"{'background-color': colorOfTheDay(dayNumber)}\">\n          <div class=\"ml-2\">\n            {{dayNumber + 1}}\n            {{resetCounter()}}\n          </div>\n          <div *ngFor=\"let item of events\">\n            <div *ngIf=\"itemCounter < 3\">\n              <div *ngIf=\"correctDate(item, dayNumber)\">\n                <div class=\"ml-1 border border-dark rounded m-1 crop pointer\" (click)=\"eventClick.emit(item)\"\n                     [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                  {{item.title}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div *ngFor=\"let afterday of numSequence(getEmptyEndDays()); let daysOfNextMonth = index;\"\n             class=\"border text-left w-14 h-117px lg\">\n          <div class=\"ml-2\">\n            {{daysOfNextMonth + 1}}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!--WOCHENANSICHT-->\n    <div *ngIf=\"initialView == 'week'\">\n      <div class=\"justify-content-center\">\n        <div class=\"border border-light\">\n          <div class=\"row\">\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div *ngFor=\"let counter of numSequence(7); let days = index\" class=\"w-14 border border-grey week-height\"\n               [ngStyle]=\"{'background-color': colorOfTheDay(getDatesOfWeek(days))}\">\n            <div *ngFor=\"let item of events\">\n              <div *ngIf=\"correctDate(item, getDatesOfWeek(days))\" class=\"m-1\">\n                <div class=\"rounded w-100 border border-dark crop pointer\" (click)=\"eventClick.emit(item)\"\n                     [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                  {{item.title}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!--TAGESANSICHT-->\n    <div *ngIf=\"initialView == 'day'\">\n      <div class=\"row justify-content-center\">\n        <div class=\"w-100\">\n          <div class=\"row\">\n            <div class=\"border border-grey w-14 bg-dark min-height\">\n              <div class=\"lg\">\n                {{localeValue.others[5]}}\n              </div>\n            </div>\n            <div class=\"w-85\">\n              <div *ngFor=\"let item of events\">\n                <div *ngIf=\"isAllDayItem(item) && correctDate(item, day - 1)\">\n                  <div class=\"border border-grey h-50 justify-content-center\">\n                    <div class=\"rounded w-100 border border-dark crop pointer\" (click)=\"eventClick.emit(item)\"\n                         [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                      {{item.title}}\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"h-2px\"></div>\n          <div *ngFor=\"let counter of numSequence(24); let hours = index; \">\n            <div class=\"row\">\n              <div class=\"border border-grey w-14 bg-dark h-50px\">\n                <div class=\"lg\">\n                  {{getHoursOfDay(hours)}}\n                </div>\n              </div>\n              <div class=\"w-85\">\n                <div class=\"border border-grey h-50\"></div>\n                <div class=\"border border-grey h-50\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n  <div class=\"container h-50px\"></div>\n</div>\n",
                styles: [".w-14{width:14.2857%}.w-85{width:85.7143%}.pointer{cursor:pointer}.h-2px{height:2px}.h-50px{height:50px}.h-100px{height:100px}.h-117px{height:119px}.lg{color:#d3d3d3}.min-height{min-height:50px}.week-height{height:300px}.border-grey{border-color:#8f8f8f}.crop{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL25pY2xhcy5sYW5nL0Rlc2t0b3AvS2FsZW5kZXIvR2l0aHViL0FCQ2FsZW5kYXIvcHJvamVjdHMvYWJjYWxlbmRhci1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFTekYsTUFBTSxPQUFPLGlCQUFpQjtJQVA5QjtRQXNCRSxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUV0QyxVQUFLLEdBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFLbkMsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUliLGVBQVUsR0FBRztZQUNYLFFBQVEsRUFBRTtnQkFDUixRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7Z0JBQzNELE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO2dCQUNsSSxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQztnQkFDNUQsSUFBSSxFQUFFLElBQUk7YUFDWDtZQUNE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VyxJQUFJLElBQUksRUFBRTtZQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQzdDO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ2pGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDN0M7YUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQzdDO0lBQ0gsQ0FBQzs7OztZQTNZRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLDJvVEFBd0M7O2FBRXpDO1lBRUEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7OzBCQUc3QixLQUFLOzBCQUVMLEtBQUs7cUJBRUwsS0FBSztvQkFFTCxLQUFLOzBCQUdMLEtBQUs7eUJBR0wsTUFBTTs7QUF5WFQsTUFBTSxPQUFPLElBQUk7Q0FNaEI7QUFFRCxNQUFNLE9BQU8sSUFBSTtDQUtoQjtBQUVELE1BQU0sT0FBTyxLQUFLO0NBS2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWNhbGVuZGFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LmNzcyddXG59KVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgaW5pdGlhbFZpZXc6IHN0cmluZztcbiAgQElucHV0KClcbiAgaW5pdGlhbERhdGU6IERhdGU7XG4gIEBJbnB1dCgpXG4gIGV2ZW50czogSXRlbVtdO1xuICBASW5wdXQoKVxuICB2aWV3czogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgbG9jYWxlVmFsdWU6IExvY2FsO1xuXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxJdGVtPigpO1xuXG4gIHRvZGF5OiBEYXRlID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7XG4gIHllYXI6IG51bWJlcjtcbiAgbW9udGg6IG51bWJlcjtcbiAgZGF5OiBudW1iZXI7XG5cbiAgeUJ0biA9IGZhbHNlO1xuICBtQnRuID0gZmFsc2U7XG4gIHdCdG4gPSBmYWxzZTtcbiAgZEJ0biA9IGZhbHNlO1xuXG4gIGl0ZW1Db3VudGVyOiBudW1iZXI7XG5cbiAgZGVmTG9jYWxlcyA9IHtcbiAgICBsb2NhbGVFbjoge1xuICAgICAgd2Vla2RheXM6IFsnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnLCAnU3VuJ10sXG4gICAgICBtb250aHM6IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddLFxuICAgICAgb3RoZXJzOiBbJ1llYXInLCAnV2VlaycsICdNb250aCcsICdEYXknLCAnVG9kYXknLCAnQWxsIERheSddLFxuICAgICAgbGFuZzogbnVsbFxuICAgIH0sXG4gICAgbG9jYWxlRGU6IHtcbiAgICAgIHdlZWtkYXlzOiBbJ01vJywgJ0RpJywgJ01pJywgJ0RvJywgJ0ZyJywgJ1NhJywgJ1NvJ10sXG4gICAgICBtb250aHM6IFsnSmFudWFyJywgJ0ZlYnJ1YXInLCAnTXJ6JywgJ0FwcmlsJywgJ01haScsICdKdW5pJywgJ0p1bGknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPS3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlemVtYmVyJ10sXG4gICAgICBvdGhlcnM6IFsnSmFocicsICdXb2NoZScsICdNb25hdCcsICdUYWcnLCAnSGV1dGUnLCAnR2FuenTDpGdpZyddLFxuICAgICAgbGFuZzogbnVsbFxuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIHN0YXRpYyBzZXRNb250aEFuZERheUZvcm1hdChkYXk6IG51bWJlciwgbW9udGg6IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBtb250aEFuZERheTogc3RyaW5nW10gPSBbJyAnLCAnICddO1xuICAgIC8vIGRheVxuICAgIGlmIChkYXkgPCAxMCkge1xuICAgICAgbW9udGhBbmREYXlbMF0gPSBgMCR7ZGF5fWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vbnRoQW5kRGF5WzBdID0gZGF5LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIC8vIG1vbnRoXG4gICAgaWYgKG1vbnRoIDwgMTApIHtcbiAgICAgIG1vbnRoQW5kRGF5WzFdID0gYDAke21vbnRofWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vbnRoQW5kRGF5WzFdID0gbW9udGgudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vbnRoQW5kRGF5O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRJbml0aWFsVmlldygpO1xuICAgIHRoaXMuc2V0SW5pdGlhbERhdGUoKTtcbiAgICB0aGlzLmNoZWNrRXZlbnRzKCk7XG4gICAgdGhpcy5wcmVwYXJlQnV0dG9ucygpO1xuICAgIHRoaXMuc2V0TG9jYWxlRm9yQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIGdldE1vbnRoc0ZvckxvY2FsZShsb2NhbGUpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgZm9ybWF0ID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7bW9udGg6ICdsb25nJ30pO1xuICAgIGNvbnN0IG1vbnRocyA9IFtdO1xuICAgIGZvciAobGV0IG1vbnRoID0gMDsgbW9udGggPCAxMjsgbW9udGgrKykge1xuICAgICAgY29uc3QgZGF0ZVRvRm9ybWF0ID0gbmV3IERhdGUoRGF0ZS5VVEMoMjAwMCwgbW9udGgsIDEsIDAsIDAsIDApKTtcbiAgICAgIG1vbnRocy5wdXNoKGZvcm1hdC5mb3JtYXQoZGF0ZVRvRm9ybWF0KSk7XG4gICAgfVxuICAgIHJldHVybiBtb250aHM7XG4gIH1cblxuICBnZXRXZWVrZGF5c0ZvckxvY2FsZShsb2NhbGUpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgZm9ybWF0ID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7d2Vla2RheTogJ2xvbmcnfSk7XG4gICAgY29uc3Qgd2Vla2RheXMgPSBbXTtcbiAgICBmb3IgKGxldCB3ZWVrZGF5ID0gMDsgd2Vla2RheSA8IDY7IHdlZWtkYXkrKykge1xuICAgICAgY29uc3QgZGF0ZVRvRm9ybWF0ID0gbmV3IERhdGUoRGF0ZS5VVEMoMjAwMCwgd2Vla2RheSwgMSwgMCwgMCwgMCkpO1xuICAgICAgd2Vla2RheXMucHVzaChmb3JtYXQuZm9ybWF0KGRhdGVUb0Zvcm1hdCkpO1xuICAgIH1cbiAgICByZXR1cm4gd2Vla2RheXM7XG4gIH1cblxuICBudW1TZXF1ZW5jZShuOiBudW1iZXIpOiBBcnJheTxudW1iZXI+IHtcbiAgICByZXR1cm4gQXJyYXkobik7XG4gIH1cblxuICBnZXREYXlzT2ZNb250aChmPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBsZXQgZmlyc3REYXk6IERhdGU7XG4gICAgaWYgKGYgPT0gbnVsbCkge1xuICAgICAgZmlyc3REYXkgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGggKyAxLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3REYXkgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIGYgKyAxLCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0RGF5LmdldERhdGUoKTtcbiAgfVxuXG4gIGdldEVtcHR5U3RhcnREYXlzKGY/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCBmaXJzdERheTogRGF0ZTtcbiAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICBmaXJzdERheSA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpcnN0RGF5ID0gbmV3IERhdGUodGhpcy55ZWFyLCBmLCAxKTtcbiAgICB9XG4gICAgc3dpdGNoIChmaXJzdERheS5nZXREYXkoKSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gNjtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gMjtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgcmV0dXJuIDM7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIHJldHVybiA0O1xuICAgICAgY2FzZSA2OlxuICAgICAgICByZXR1cm4gNTtcbiAgICB9XG4gIH1cblxuICBnZXRFbXB0eUVuZERheXMoZj86IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgZGF5c09mTW9udGggPSB0aGlzLmdldERheXNPZk1vbnRoKGYpO1xuICAgIGNvbnN0IGdldEVtcHR5U3RhcnREYXkgPSB0aGlzLmdldEVtcHR5U3RhcnREYXlzKGYpO1xuICAgIHJldHVybiA0MiAtIGRheXNPZk1vbnRoIC0gZ2V0RW1wdHlTdGFydERheTtcbiAgfVxuXG4gIHByZXYoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbFZpZXcgPT09ICd5ZWFyJykge1xuICAgICAgdGhpcy55ZWFyLS07XG4gICAgfSBlbHNlIGlmICh0aGlzLmluaXRpYWxWaWV3ID09PSAnbW9udGgnKSB7XG4gICAgICBpZiAodGhpcy5tb250aCA+IDApIHtcbiAgICAgICAgdGhpcy5tb250aC0tO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tb250aCA9IDExO1xuICAgICAgICB0aGlzLnllYXItLTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdGlhbFZpZXcgPT09ICd3ZWVrJykge1xuICAgICAgaWYgKHRoaXMuZGF5IC0gNyA8IDApIHtcbiAgICAgICAgdGhpcy5kYXkgPSB0aGlzLmdldERheXNPZk1vbnRoKHRoaXMubW9udGggLSAxKSArICh0aGlzLmRheSAtIDcpO1xuICAgICAgICBpZiAodGhpcy5tb250aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMubW9udGggPSAxMTtcbiAgICAgICAgICB0aGlzLnllYXItLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1vbnRoLS07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGF5ID0gdGhpcy5kYXkgLSA3O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5kYXkgPiAxKSB7XG4gICAgICAgIHRoaXMuZGF5LS07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vbnRoLS07XG4gICAgICAgIHRoaXMuZGF5ID0gdGhpcy5nZXREYXlzT2ZNb250aCh0aGlzLm1vbnRoKTtcbiAgICAgICAgaWYgKHRoaXMubW9udGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLmRheSA9IDMxO1xuICAgICAgICAgIHRoaXMubW9udGggPSAxMTtcbiAgICAgICAgICB0aGlzLnllYXItLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGN1cnJlbnREYXkoKTogdm9pZCB7XG4gICAgdGhpcy55ZWFyID0gdGhpcy50b2RheS5nZXRGdWxsWWVhcigpO1xuICAgIHRoaXMubW9udGggPSB0aGlzLnRvZGF5LmdldE1vbnRoKCk7XG4gICAgdGhpcy5kYXkgPSB0aGlzLnRvZGF5LmdldERhdGUoKTtcbiAgfVxuXG4gIG5leHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbFZpZXcgPT09ICd5ZWFyJykge1xuICAgICAgdGhpcy55ZWFyKys7XG4gICAgfSBlbHNlIGlmICh0aGlzLmluaXRpYWxWaWV3ID09PSAnbW9udGgnKSB7XG4gICAgICBpZiAodGhpcy5tb250aCA8IDExKSB7XG4gICAgICAgIHRoaXMubW9udGgrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubW9udGggPSAwO1xuICAgICAgICB0aGlzLnllYXIrKztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdGlhbFZpZXcgPT09ICd3ZWVrJykge1xuICAgICAgaWYgKHRoaXMuZGF5ICsgNyA+IHRoaXMuZ2V0RGF5c09mTW9udGgodGhpcy5tb250aCkpIHtcbiAgICAgICAgdGhpcy5kYXkgPSB0aGlzLmRheSArIDcgLSB0aGlzLmdldERheXNPZk1vbnRoKHRoaXMubW9udGgpO1xuICAgICAgICBpZiAodGhpcy5tb250aCA9PT0gMTEpIHtcbiAgICAgICAgICB0aGlzLm1vbnRoID0gMDtcbiAgICAgICAgICB0aGlzLnllYXIrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1vbnRoKys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGF5ID0gdGhpcy5kYXkgKyA3O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5kYXkgPCB0aGlzLmdldERheXNPZk1vbnRoKHRoaXMubW9udGgpIC0gMSkge1xuICAgICAgICB0aGlzLmRheSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kYXkgPSAxO1xuICAgICAgICBpZiAodGhpcy5tb250aCA8IDExKSB7XG4gICAgICAgICAgdGhpcy5tb250aCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubW9udGggPSAwO1xuICAgICAgICAgIHRoaXMueWVhcisrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VGl0bGUoKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHRoaXMuaW5pdGlhbFZpZXcpIHtcbiAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICByZXR1cm4gdGhpcy55ZWFyLnRvU3RyaW5nKCk7XG4gICAgICBjYXNlICdtb250aCc6XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmxvY2FsZVZhbHVlLm1vbnRoc1t0aGlzLm1vbnRoXX0gJHt0aGlzLnllYXIudG9TdHJpbmcoKX1gO1xuICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgIGNvbnN0IHdob2xlV2VlayA9IHRoaXMuZ2V0V2hvbGVXZWVrKCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy5kYXkgLSB3aG9sZVdlZWtbMF0pO1xuICAgICAgICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCB0aGlzLmRheSArIHdob2xlV2Vla1sxXSk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFN0YXJ0RGF0ZSA9IENhbGVuZGFyQ29tcG9uZW50LnNldE1vbnRoQW5kRGF5Rm9ybWF0KHN0YXJ0RGF0ZS5nZXREYXRlKCkgKyAxLCBzdGFydERhdGUuZ2V0TW9udGgoKSArIDEpO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRFbmREYXRlID0gQ2FsZW5kYXJDb21wb25lbnQuc2V0TW9udGhBbmREYXlGb3JtYXQoZW5kRGF0ZS5nZXREYXRlKCkgKyAxLCBlbmREYXRlLmdldE1vbnRoKCkgKyAxKTtcbiAgICAgICAgY29uc3Qgc3RhcnREYXkgPSBgJHtmb3JtYXR0ZWRTdGFydERhdGVbMF19LiR7Zm9ybWF0dGVkU3RhcnREYXRlWzFdfWA7XG4gICAgICAgIGNvbnN0IGVuZERheSA9IGAke2Zvcm1hdHRlZEVuZERhdGVbMF19LiR7Zm9ybWF0dGVkRW5kRGF0ZVsxXX0uJHtlbmREYXRlLmdldEZ1bGxZZWFyKCl9YDtcbiAgICAgICAgcmV0dXJuIGAke3N0YXJ0RGF5fSAtICR7ZW5kRGF5fWA7XG4gICAgICBjYXNlICdkYXknOlxuICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gQ2FsZW5kYXJDb21wb25lbnQuc2V0TW9udGhBbmREYXlGb3JtYXQodGhpcy5kYXksIHRoaXMubW9udGggKyAxKTtcbiAgICAgICAgcmV0dXJuIGAke2Zvcm1hdHRlZERhdGVbMF19LiR7Zm9ybWF0dGVkRGF0ZVsxXX0uJHt0aGlzLnllYXJ9YDtcbiAgICB9XG4gIH1cblxuICBnZXRJdGVtQ29sb3IoaXRlbTogSXRlbSk6IHN0cmluZyB7XG4gICAgaWYgKGl0ZW0uY29sb3IgPT0gbnVsbCB8fCAhaXRlbS5jb2xvci5tYXRjaCgvXiMoWzAtOWEtZl17M30pezEsMn0kL2kpKSB7XG4gICAgICByZXR1cm4gJyNlN2UyZTInO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXRlbS5jb2xvcjtcbiAgICB9XG4gIH1cblxuICBnZXRUZXh0Q29sb3IoYmFja2dyb3VuZENvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHIgPSBwYXJzZUludChiYWNrZ3JvdW5kQ29sb3Iuc3Vic3RyaW5nKDEsIDMpLCAxNik7XG4gICAgY29uc3QgZyA9IHBhcnNlSW50KGJhY2tncm91bmRDb2xvci5zdWJzdHJpbmcoMywgNSksIDE2KTtcbiAgICBjb25zdCBiID0gcGFyc2VJbnQoYmFja2dyb3VuZENvbG9yLnN1YnN0cmluZyg1LCA3KSwgMTYpO1xuICAgIGNvbnN0IGx1bWluYW5jZSA9ICgwLjI5OSAqIHIgKyAwLjU4NyAqIGcgKyAwLjExNCAqIGIpIC8gMjU1O1xuICAgIHJldHVybiBsdW1pbmFuY2UgPiAwLjUgPyAnIzAwMDAwMCcgOiAnI0ZGRkZGRic7XG4gIH1cblxuICBjb3JyZWN0RGF0ZShpdGVtOiBJdGVtLCBkYXk6IG51bWJlciwgbW9udGg/OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAobW9udGggPT0gbnVsbCkge1xuICAgICAgbW9udGggPSB0aGlzLm1vbnRoO1xuICAgIH1cbiAgICBjb25zdCBkYXRlVG9DaGVjayA9IG5ldyBEYXRlKHRoaXMueWVhciwgbW9udGgsIGRheSArIDEsIDEsIDAsIDAsIDApO1xuICAgIGNvbnN0IGl0ZW1EYXRlID0gbmV3IERhdGUoaXRlbS5kYXRlT2ZFeHBpcnkpO1xuICAgIGNvbnN0IGlzQ3VycmVudERhdGUgPVxuICAgICAgaXRlbURhdGUuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZVRvQ2hlY2suZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgaXRlbURhdGUuZ2V0TW9udGgoKSA9PT0gZGF0ZVRvQ2hlY2suZ2V0TW9udGgoKSAmJlxuICAgICAgZGF0ZVRvQ2hlY2suZ2V0RGF0ZSgpID09PSBpdGVtRGF0ZS5nZXREYXRlKCk7XG4gICAgaWYgKGlzQ3VycmVudERhdGUpIHtcbiAgICAgIHRoaXMuaXRlbUNvdW50ZXIrKztcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaXNUb0xhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbUNvdW50ZXIgPD0gMztcbiAgfVxuXG4gIGNvbG9yT2ZUaGVEYXkoZGF5TnVtYmVyOiBudW1iZXIsIHJpZ2h0TW9udGg/OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCBhO1xuICAgIGlmIChyaWdodE1vbnRoID09IG51bGwpIHtcbiAgICAgIGEgPSBEYXRlLlVUQyh0aGlzLnllYXIsIG5ldyBEYXRlKERhdGUubm93KCkpLmdldE1vbnRoKCksIGRheU51bWJlciArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhID0gRGF0ZS5VVEModGhpcy55ZWFyLCByaWdodE1vbnRoLCBkYXlOdW1iZXIgKyAxKTtcbiAgICB9XG4gICAgY29uc3QgYiA9IERhdGUuVVRDKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy50b2RheS5nZXREYXRlKCkpO1xuICAgIGlmIChhID09PSBiKSB7XG4gICAgICByZXR1cm4gJyNlY2VjZjUnO1xuICAgIH1cbiAgfVxuXG4gIGdldEhvdXJzT2ZEYXkoaG91cnM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKGhvdXJzID49IDEwKSB7XG4gICAgICByZXR1cm4gaG91cnMudG9TdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAwJHtob3Vyc31gO1xuICAgIH1cbiAgfVxuXG4gIGlzQWxsRGF5SXRlbShpdGVtOiBJdGVtKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGl0ZW0uZGF0ZU9mRXhwaXJ5KS5nZXREYXRlKCkgPT09IHRoaXMuZGF5O1xuICB9XG5cbiAgZ2V0RGF0ZXNPZldlZWsoaW5kZXhEYXk6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCB0aGlzLmRheSAtIHRoaXMuZ2V0V2hvbGVXZWVrKClbMF0pO1xuICAgIHJldHVybiBzdGFydERhdGUuZ2V0RGF0ZSgpICsgaW5kZXhEYXk7XG4gIH1cblxuICByZXNldENvdW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtQ291bnRlciA9IDA7XG4gIH1cblxuICBwcml2YXRlIHNldEluaXRpYWxWaWV3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmluaXRpYWxWaWV3ID09IG51bGwpIHtcbiAgICAgIHRoaXMuaW5pdGlhbFZpZXcgPSAnbW9udGgnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbERhdGUoKTogdm9pZCB7XG4gICAgbGV0IGRhdGU6IERhdGU7XG4gICAgaWYgKHRoaXMuaW5pdGlhbERhdGUgPT0gbnVsbCkge1xuICAgICAgZGF0ZSA9IG5ldyBEYXRlKERhdGUubm93KCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlID0gdGhpcy5pbml0aWFsRGF0ZTtcbiAgICB9XG4gICAgdGhpcy55ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIHRoaXMubW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgdGhpcy5kYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tFdmVudHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXZlbnRzID09PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZygnTk8gRVZFTlRTJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRXaG9sZVdlZWsoKTogbnVtYmVyW10ge1xuICAgIHN3aXRjaCAobmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCB0aGlzLmRheSArIDEpLmdldERheSgpKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBbNiwgMF07XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBbMCwgNl07XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBbMSwgNV07XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBbMiwgNF07XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHJldHVybiBbMywgM107XG4gICAgICBjYXNlIDU6XG4gICAgICAgIHJldHVybiBbNCwgMl07XG4gICAgICBjYXNlIDY6XG4gICAgICAgIHJldHVybiBbNSwgMV07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlQnV0dG9ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52aWV3cyA9PSBudWxsKSB7XG4gICAgICB0aGlzLm1CdG4gPSB0cnVlO1xuICAgICAgdGhpcy53QnRuID0gdHJ1ZTtcbiAgICAgIHRoaXMuZEJ0biA9IHRydWU7XG4gICAgICB0aGlzLnlCdG4gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGJ0biBvZiB0aGlzLnZpZXdzKSB7XG4gICAgICAgIHN3aXRjaCAoYnRuKSB7XG4gICAgICAgICAgY2FzZSAneWVhcic6IHtcbiAgICAgICAgICAgIHRoaXMueUJ0biA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAnbW9udGgnOiB7XG4gICAgICAgICAgICB0aGlzLm1CdG4gPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ3dlZWsnOiB7XG4gICAgICAgICAgICB0aGlzLndCdG4gPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ2RheSc6IHtcbiAgICAgICAgICAgIHRoaXMuZEJ0biA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldExvY2FsZUZvckNhbGVuZGFyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxvY2FsZVZhbHVlID09IG51bGwpIHtcbiAgICAgIHRoaXMubG9jYWxlVmFsdWUgPSB0aGlzLmRlZkxvY2FsZXMubG9jYWxlRW47XG4gICAgfSBlbHNlIGlmICh0aGlzLmxvY2FsZVZhbHVlLmxhbmcgPT09ICdlbi1FbicgfHwgdGhpcy5sb2NhbGVWYWx1ZS5sYW5nID09PSAnZW4tVVMnKSB7XG4gICAgICB0aGlzLmxvY2FsZVZhbHVlID0gdGhpcy5kZWZMb2NhbGVzLmxvY2FsZUVuO1xuICAgIH0gZWxzZSBpZiAoJ2RlLURlJykge1xuICAgICAgdGhpcy5sb2NhbGVWYWx1ZSA9IHRoaXMuZGVmTG9jYWxlcy5sb2NhbGVEZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEl0ZW0ge1xuICBpdGVtSWQ/OiBudW1iZXI7XG4gIGxpc3Q/OiBMaXN0O1xuICB0aXRsZTogc3RyaW5nO1xuICBjb2xvcj86IHN0cmluZztcbiAgZGF0ZU9mRXhwaXJ5OiBEYXRlO1xufVxuXG5leHBvcnQgY2xhc3MgTGlzdCB7XG4gIGxpc3RJZD86IG51bWJlcjtcbiAgaXRlbT86IEl0ZW1bXTtcbiAgdGl0bGU/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGRhdGVPZkV4cGlyeT86IERhdGU7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhbCB7XG4gIHdlZWtkYXlzID86IHN0cmluZ1tdO1xuICBtb250aHMgPzogc3RyaW5nW107XG4gIG90aGVycyA/OiBzdHJpbmdbXTtcbiAgbGFuZyA/OiBzdHJpbmc7XG59XG4iXX0=