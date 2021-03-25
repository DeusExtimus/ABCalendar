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
            a = Date.UTC(this.year, this.month, dayNumber + 1);
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
            this.dBtn = true;
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
}
CalendarComponent.ɵprov = i0.ɵɵdefineInjectable({ factory: function CalendarComponent_Factory() { return new CalendarComponent(); }, token: CalendarComponent, providedIn: "root" });
CalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-calendar',
                template: "<div class=\"container-fluid\">\n  <div class=\"ml-5 mr-5 text-center\">\n    <!--  HEADER-->\n    <div class=\"row mt-5\">\n      <div class=\"col-4\">\n        <div class=\"btn-group\" role=\"group\">\n          <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"prev()\"> &#60;</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\"\n                  (click)=\"currentDay()\">{{localeValue.others[4]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"next()\">&#62;</button>\n        </div>\n      </div>\n      <div class=\"col-4 text-center\"><h1>{{setTitle()}}</h1></div>\n      <div class=\"col-4\">\n        <div class=\"btn-group text-right\" role=\"group\">\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"yBtn\"\n                  (click)=\"initialView = 'year'; itemCounter = 0\">{{localeValue.others[0]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"mBtn\"\n                  (click)=\"initialView = 'month'; itemCounter = 0\">{{localeValue.others[2]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"wBtn\"\n                  (click)=\"initialView = 'week'; itemCounter = 0\">{{localeValue.others[1]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"dBtn\"\n                  (click)=\"initialView = 'day'; itemCounter = 0\">{{localeValue.others[3]}}</button>\n        </div>\n      </div>\n    </div>\n\n    <!--JAHRESANSICHT-->\n    <div class=\"row\" *ngIf=\"initialView =='year'\">\n      <div *ngFor=\"let column of numSequence(12); let f = index;\" class=\"col-lg-4 mt-3\">\n        <div class=\"border\">\n          <div class=\"col-12 justify-content-center\">\n            <!--            Monthnames-->\n            <div class=\"container-fluid text-center\">\n              <h5 style=\"font-weight: bolder\">{{localeValue.months[f]}}</h5>\n            </div>\n            <div class=\"row\">\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\n\n              <div *ngFor=\"let beforeDay of numSequence(getEmptyStartDays(f)); let ac = index;\"\n                   class=\"border w-14 h-117px\">\n              </div>\n              <div *ngFor=\"let currentDay of numSequence(getDaysOfMonth(f)); let dayNumber = index;\"\n                   class=\"border text-left w-14 h-117px\"\n                   [ngStyle]=\"{'background-color': colorOfTheDay(dayNumber, f)}\">\n                <div class=\"ml-2\">\n                  {{dayNumber + 1}}\n                  {{resetCounter()}}\n                </div>\n                <div *ngFor=\"let item of events\">\n                  <div *ngIf=\"itemCounter < 3\">\n                    <div *ngIf=\"correctDate(item, dayNumber, f)\" class=\"border border-dark rounded m-1\"\n                         [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                      <div class=\"ml-1 crop pointer\" (click)=\"eventClick.emit(item)\">\n                        {{item.title}}\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div *ngFor=\"let afterDay of numSequence(getEmptyEndDays(f)); let daysOfNextMonth = index;\"\n                   class=\"border w-14 h-117px\"\n                   style=\"color: lightgray\">\n                {{daysOfNextMonth + 1}}\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!--MONATSANSICHT-->\n    <div *ngIf=\"initialView == 'month'\">\n      <div class=\"row\">\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\n        <div *ngFor=\"let beforeday of numSequence(getEmptyStartDays()); let ac = index;\"\n             class=\"border w-14 h-117px\">\n        </div>\n        <div *ngFor=\"let currentday of numSequence(getDaysOfMonth()); let dayNumber = index\"\n             class=\"border text-left w-14 h-117px\" [ngStyle]=\"{'background-color': colorOfTheDay(dayNumber)}\">\n          <div class=\"ml-2\">\n            {{dayNumber + 1}}\n            {{resetCounter()}}\n          </div>\n          <div *ngFor=\"let item of events\">\n            <div *ngIf=\"itemCounter < 3\">\n              <div *ngIf=\"correctDate(item, dayNumber)\">\n                <div class=\"ml-1 border border-dark rounded m-1 crop pointer\" (click)=\"eventClick.emit(item)\"\n                     [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                  {{item.title}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div *ngFor=\"let afterday of numSequence(getEmptyEndDays()); let daysOfNextMonth = index;\"\n             class=\"border text-left w-14 h-117px lg\">\n          <div class=\"ml-2\">\n            {{daysOfNextMonth + 1}}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!--WOCHENANSICHT-->\n    <div *ngIf=\"initialView == 'week'\">\n      <div class=\"justify-content-center\">\n        <div class=\"border border-light\">\n          <div class=\"row\">\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div *ngFor=\"let counter of numSequence(7); let days = index\" class=\"w-14 border border-grey week-height\"\n               [ngStyle]=\"{'background-color': colorOfTheDay(getDatesOfWeek(days))}\">\n            <div *ngFor=\"let item of events\">\n              <div *ngIf=\"correctDate(item, getDatesOfWeek(days))\" class=\"m-1\">\n                <div class=\"rounded w-100 border border-dark crop pointer\" (click)=\"eventClick.emit(item)\"\n                     [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                  {{item.title}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!--TAGESANSICHT-->\n    <div *ngIf=\"initialView == 'day'\">\n      <div class=\"row justify-content-center\">\n        <div class=\"w-100\">\n          <div class=\"row\">\n            <div class=\"border border-grey w-14 bg-dark min-height\">\n              <div class=\"lg\">\n                {{localeValue.others[5]}}\n              </div>\n            </div>\n            <div class=\"w-85\">\n              <div *ngFor=\"let item of events\">\n                <div *ngIf=\"isAllDayItem(item) && correctDate(item, day - 1)\">\n                  <div class=\"border border-grey h-50 justify-content-center\">\n                    <div class=\"rounded w-100 border border-dark crop pointer\" (click)=\"eventClick.emit(item)\"\n                         [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                      {{item.title}}\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"h-2px\"></div>\n          <div *ngFor=\"let counter of numSequence(24); let hours = index; \">\n            <div class=\"row\">\n              <div class=\"border border-grey w-14 bg-dark h-50px\">\n                <div class=\"lg\">\n                  {{getHoursOfDay(hours)}}\n                </div>\n              </div>\n              <div class=\"w-85\">\n                <div class=\"border border-grey h-50\"></div>\n                <div class=\"border border-grey h-50\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n  <div class=\"container h-50px\"></div>\n</div>\n",
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
    constructor() {
        this.weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.others = ['Year', 'Week', 'Month', 'Day', 'Today', 'All Day'];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL25pY2xhcy5sYW5nL0Rlc2t0b3AvS2FsZW5kZXIvR2l0aHViL0FCQ2FsZW5kYXIvcHJvamVjdHMvYWJjYWxlbmRhci1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFTekYsTUFBTSxPQUFPLGlCQUFpQjtJQVA5QjtRQXNCRSxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUV0QyxVQUFLLEdBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFLbkMsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsU0FBSSxHQUFHLEtBQUssQ0FBQztLQThUZDtJQTFUUyxNQUFNLENBQUMsb0JBQW9CLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDNUQsTUFBTSxXQUFXLEdBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekMsTUFBTTtRQUNOLElBQUksR0FBRyxHQUFHLEVBQUUsRUFBRTtZQUNaLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQzVCO2FBQU07WUFDTCxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsUUFBUTtRQUNSLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtZQUNkLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQzlCO2FBQU07WUFDTCxXQUFXLENB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SUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDakIsTUFBTTtxQkFDUDtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7O1lBN1ZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsdXJUQUF3Qzs7YUFFekM7WUFFQSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7MEJBRzdCLEtBQUs7MEJBRUwsS0FBSztxQkFFTCxLQUFLO29CQUVMLEtBQUs7MEJBR0wsS0FBSzt5QkFHTCxNQUFNOztBQTJVVCxNQUFNLE9BQU8sSUFBSTtDQU9oQjtBQUVELE1BQU0sT0FBTyxJQUFJO0NBTWhCO0FBRUQsTUFBTSxPQUFPLEtBQUs7SUFBbEI7UUFDRSxhQUFRLEdBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvRCxXQUFNLEdBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3RJLFdBQU0sR0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWNhbGVuZGFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LmNzcyddXG59KVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgaW5pdGlhbFZpZXc6IHN0cmluZztcbiAgQElucHV0KClcbiAgaW5pdGlhbERhdGU6IERhdGU7XG4gIEBJbnB1dCgpXG4gIGV2ZW50czogSXRlbVtdO1xuICBASW5wdXQoKVxuICB2aWV3czogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgbG9jYWxlVmFsdWU6IExvY2FsO1xuXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxJdGVtPigpO1xuXG4gIHRvZGF5OiBEYXRlID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7XG4gIHllYXI6IG51bWJlcjtcbiAgbW9udGg6IG51bWJlcjtcbiAgZGF5OiBudW1iZXI7XG5cbiAgeUJ0biA9IGZhbHNlO1xuICBtQnRuID0gZmFsc2U7XG4gIHdCdG4gPSBmYWxzZTtcbiAgZEJ0biA9IGZhbHNlO1xuXG4gIGl0ZW1Db3VudGVyOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc2V0TW9udGhBbmREYXlGb3JtYXQoZGF5OiBudW1iZXIsIG1vbnRoOiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgbW9udGhBbmREYXk6IHN0cmluZ1tdID0gWycgJywgJyAnXTtcbiAgICAvLyBkYXlcbiAgICBpZiAoZGF5IDwgMTApIHtcbiAgICAgIG1vbnRoQW5kRGF5WzBdID0gYDAke2RheX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb250aEFuZERheVswXSA9IGRheS50b1N0cmluZygpO1xuICAgIH1cbiAgICAvLyBtb250aFxuICAgIGlmIChtb250aCA8IDEwKSB7XG4gICAgICBtb250aEFuZERheVsxXSA9IGAwJHttb250aH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb250aEFuZERheVsxXSA9IG1vbnRoLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBtb250aEFuZERheTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0SW5pdGlhbFZpZXcoKTtcbiAgICB0aGlzLnNldEluaXRpYWxEYXRlKCk7XG4gICAgdGhpcy5jaGVja0V2ZW50cygpO1xuICAgIHRoaXMucHJlcGFyZUJ1dHRvbnMoKTtcbiAgfVxuXG4gIG51bVNlcXVlbmNlKG46IG51bWJlcik6IEFycmF5PG51bWJlcj4ge1xuICAgIHJldHVybiBBcnJheShuKTtcbiAgfVxuXG4gIGdldERheXNPZk1vbnRoKGY/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCBmaXJzdERheTogRGF0ZTtcbiAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICBmaXJzdERheSA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCArIDEsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaXJzdERheSA9IG5ldyBEYXRlKHRoaXMueWVhciwgZiArIDEsIDApO1xuICAgIH1cbiAgICByZXR1cm4gZmlyc3REYXkuZ2V0RGF0ZSgpO1xuICB9XG5cbiAgZ2V0RW1wdHlTdGFydERheXMoZj86IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IGZpcnN0RGF5OiBEYXRlO1xuICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgIGZpcnN0RGF5ID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3REYXkgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIGYsIDEpO1xuICAgIH1cbiAgICBzd2l0Y2ggKGZpcnN0RGF5LmdldERheSgpKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiA2O1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gMDtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiAyO1xuICAgICAgY2FzZSA0OlxuICAgICAgICByZXR1cm4gMztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgcmV0dXJuIDQ7XG4gICAgICBjYXNlIDY6XG4gICAgICAgIHJldHVybiA1O1xuICAgIH1cbiAgfVxuXG4gIGdldEVtcHR5RW5kRGF5cyhmPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkYXlzT2ZNb250aCA9IHRoaXMuZ2V0RGF5c09mTW9udGgoZik7XG4gICAgY29uc3QgZ2V0RW1wdHlTdGFydERheSA9IHRoaXMuZ2V0RW1wdHlTdGFydERheXMoZik7XG4gICAgcmV0dXJuIDQyIC0gZGF5c09mTW9udGggLSBnZXRFbXB0eVN0YXJ0RGF5O1xuICB9XG5cbiAgcHJldigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbml0aWFsVmlldyA9PT0gJ3llYXInKSB7XG4gICAgICB0aGlzLnllYXItLTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdGlhbFZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgIGlmICh0aGlzLm1vbnRoID4gMCkge1xuICAgICAgICB0aGlzLm1vbnRoLS07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vbnRoID0gMTE7XG4gICAgICAgIHRoaXMueWVhci0tO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5pbml0aWFsVmlldyA9PT0gJ3dlZWsnKSB7XG4gICAgICBpZiAodGhpcy5kYXkgLSA3IDwgMCkge1xuICAgICAgICB0aGlzLmRheSA9IHRoaXMuZ2V0RGF5c09mTW9udGgodGhpcy5tb250aCAtIDEpICsgKHRoaXMuZGF5IC0gNyk7XG4gICAgICAgIGlmICh0aGlzLm1vbnRoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5tb250aCA9IDExO1xuICAgICAgICAgIHRoaXMueWVhci0tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubW9udGgtLTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kYXkgPSB0aGlzLmRheSAtIDc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmRheSA+IDEpIHtcbiAgICAgICAgdGhpcy5kYXktLTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubW9udGgtLTtcbiAgICAgICAgdGhpcy5kYXkgPSB0aGlzLmdldERheXNPZk1vbnRoKHRoaXMubW9udGgpO1xuICAgICAgICBpZiAodGhpcy5tb250aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuZGF5ID0gMzE7XG4gICAgICAgICAgdGhpcy5tb250aCA9IDExO1xuICAgICAgICAgIHRoaXMueWVhci0tO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3VycmVudERheSgpOiB2b2lkIHtcbiAgICB0aGlzLnllYXIgPSB0aGlzLnRvZGF5LmdldEZ1bGxZZWFyKCk7XG4gICAgdGhpcy5tb250aCA9IHRoaXMudG9kYXkuZ2V0TW9udGgoKTtcbiAgICB0aGlzLmRheSA9IHRoaXMudG9kYXkuZ2V0RGF0ZSgpO1xuICB9XG5cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbml0aWFsVmlldyA9PT0gJ3llYXInKSB7XG4gICAgICB0aGlzLnllYXIrKztcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdGlhbFZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgIGlmICh0aGlzLm1vbnRoIDwgMTEpIHtcbiAgICAgICAgdGhpcy5tb250aCsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tb250aCA9IDA7XG4gICAgICAgIHRoaXMueWVhcisrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5pbml0aWFsVmlldyA9PT0gJ3dlZWsnKSB7XG4gICAgICBpZiAodGhpcy5kYXkgKyA3ID4gdGhpcy5nZXREYXlzT2ZNb250aCh0aGlzLm1vbnRoKSkge1xuICAgICAgICB0aGlzLmRheSA9IHRoaXMuZGF5ICsgNyAtIHRoaXMuZ2V0RGF5c09mTW9udGgodGhpcy5tb250aCk7XG4gICAgICAgIGlmICh0aGlzLm1vbnRoID09PSAxMSkge1xuICAgICAgICAgIHRoaXMubW9udGggPSAwO1xuICAgICAgICAgIHRoaXMueWVhcisrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubW9udGgrKztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kYXkgPSB0aGlzLmRheSArIDc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmRheSA8IHRoaXMuZ2V0RGF5c09mTW9udGgodGhpcy5tb250aCkgLSAxKSB7XG4gICAgICAgIHRoaXMuZGF5Kys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRheSA9IDE7XG4gICAgICAgIGlmICh0aGlzLm1vbnRoIDwgMTEpIHtcbiAgICAgICAgICB0aGlzLm1vbnRoKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tb250aCA9IDA7XG4gICAgICAgICAgdGhpcy55ZWFyKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRUaXRsZSgpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy5pbml0aWFsVmlldykge1xuICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgIHJldHVybiB0aGlzLnllYXIudG9TdHJpbmcoKTtcbiAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubG9jYWxlVmFsdWUubW9udGhzW3RoaXMubW9udGhdfSAke3RoaXMueWVhci50b1N0cmluZygpfWA7XG4gICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgY29uc3Qgd2hvbGVXZWVrID0gdGhpcy5nZXRXaG9sZVdlZWsoKTtcbiAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCB0aGlzLmRheSAtIHdob2xlV2Vla1swXSk7XG4gICAgICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIHRoaXMuZGF5ICsgd2hvbGVXZWVrWzFdKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkU3RhcnREYXRlID0gQ2FsZW5kYXJDb21wb25lbnQuc2V0TW9udGhBbmREYXlGb3JtYXQoc3RhcnREYXRlLmdldERhdGUoKSArIDEsIHN0YXJ0RGF0ZS5nZXRNb250aCgpICsgMSk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZEVuZERhdGUgPSBDYWxlbmRhckNvbXBvbmVudC5zZXRNb250aEFuZERheUZvcm1hdChlbmREYXRlLmdldERhdGUoKSArIDEsIGVuZERhdGUuZ2V0TW9udGgoKSArIDEpO1xuICAgICAgICBjb25zdCBzdGFydERheSA9IGAke2Zvcm1hdHRlZFN0YXJ0RGF0ZVswXX0uJHtmb3JtYXR0ZWRTdGFydERhdGVbMV19YDtcbiAgICAgICAgY29uc3QgZW5kRGF5ID0gYCR7Zm9ybWF0dGVkRW5kRGF0ZVswXX0uJHtmb3JtYXR0ZWRFbmREYXRlWzFdfS4ke2VuZERhdGUuZ2V0RnVsbFllYXIoKX1gO1xuICAgICAgICByZXR1cm4gYCR7c3RhcnREYXl9IC0gJHtlbmREYXl9YDtcbiAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBDYWxlbmRhckNvbXBvbmVudC5zZXRNb250aEFuZERheUZvcm1hdCh0aGlzLmRheSwgdGhpcy5tb250aCArIDEpO1xuICAgICAgICByZXR1cm4gYCR7Zm9ybWF0dGVkRGF0ZVswXX0uJHtmb3JtYXR0ZWREYXRlWzFdfS4ke3RoaXMueWVhcn1gO1xuICAgIH1cbiAgfVxuXG4gIGdldEl0ZW1Db2xvcihpdGVtOiBJdGVtKTogc3RyaW5nIHtcbiAgICBpZiAoaXRlbS5jb2xvciA9PSBudWxsIHx8ICFpdGVtLmNvbG9yLm1hdGNoKC9eIyhbMC05YS1mXXszfSl7MSwyfSQvaSkpIHtcbiAgICAgIHJldHVybiAnI2U3ZTJlMic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpdGVtLmNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIGdldFRleHRDb2xvcihiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KGJhY2tncm91bmRDb2xvci5zdWJzdHJpbmcoMSwgMyksIDE2KTtcbiAgICBjb25zdCBnID0gcGFyc2VJbnQoYmFja2dyb3VuZENvbG9yLnN1YnN0cmluZygzLCA1KSwgMTYpO1xuICAgIGNvbnN0IGIgPSBwYXJzZUludChiYWNrZ3JvdW5kQ29sb3Iuc3Vic3RyaW5nKDUsIDcpLCAxNik7XG4gICAgY29uc3QgbHVtaW5hbmNlID0gKDAuMjk5ICogciArIDAuNTg3ICogZyArIDAuMTE0ICogYikgLyAyNTU7XG4gICAgcmV0dXJuIGx1bWluYW5jZSA+IDAuNSA/ICcjMDAwMDAwJyA6ICcjRkZGRkZGJztcbiAgfVxuXG4gIGNvcnJlY3REYXRlKGl0ZW06IEl0ZW0sIGRheTogbnVtYmVyLCBtb250aD86IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmIChtb250aCA9PSBudWxsKSB7XG4gICAgICBtb250aCA9IHRoaXMubW9udGg7XG4gICAgfVxuICAgIGNvbnN0IGRhdGVUb0NoZWNrID0gbmV3IERhdGUodGhpcy55ZWFyLCBtb250aCwgZGF5ICsgMSwgMSwgMCwgMCwgMCk7XG4gICAgY29uc3QgaXRlbURhdGUgPSBuZXcgRGF0ZShpdGVtLmRhdGVPZkV4cGlyeSk7XG4gICAgY29uc3QgaXNDdXJyZW50RGF0ZSA9XG4gICAgICBpdGVtRGF0ZS5nZXRGdWxsWWVhcigpID09PSBkYXRlVG9DaGVjay5nZXRGdWxsWWVhcigpICYmXG4gICAgICBpdGVtRGF0ZS5nZXRNb250aCgpID09PSBkYXRlVG9DaGVjay5nZXRNb250aCgpICYmXG4gICAgICBkYXRlVG9DaGVjay5nZXREYXRlKCkgPT09IGl0ZW1EYXRlLmdldERhdGUoKTtcbiAgICBpZiAoaXNDdXJyZW50RGF0ZSkge1xuICAgICAgdGhpcy5pdGVtQ291bnRlcisrO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpc1RvTGF0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtQ291bnRlciA8PSAzO1xuICB9XG5cbiAgY29sb3JPZlRoZURheShkYXlOdW1iZXI6IG51bWJlciwgcmlnaHRNb250aD86IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IGE7XG4gICAgaWYgKHJpZ2h0TW9udGggPT0gbnVsbCkge1xuICAgICAgYSA9IERhdGUuVVRDKHRoaXMueWVhciwgdGhpcy5tb250aCwgZGF5TnVtYmVyICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSBEYXRlLlVUQyh0aGlzLnllYXIsIHJpZ2h0TW9udGgsIGRheU51bWJlciArIDEpO1xuICAgIH1cbiAgICBjb25zdCBiID0gRGF0ZS5VVEModGhpcy55ZWFyLCB0aGlzLm1vbnRoLCB0aGlzLnRvZGF5LmdldERhdGUoKSk7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgIHJldHVybiAnI2VjZWNmNSc7XG4gICAgfVxuICB9XG5cbiAgZ2V0SG91cnNPZkRheShob3VyczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAoaG91cnMgPj0gMTApIHtcbiAgICAgIHJldHVybiBob3Vycy50b1N0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYDAke2hvdXJzfWA7XG4gICAgfVxuICB9XG5cbiAgaXNBbGxEYXlJdGVtKGl0ZW06IEl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gbmV3IERhdGUoaXRlbS5kYXRlT2ZFeHBpcnkpLmdldERhdGUoKSA9PT0gdGhpcy5kYXk7XG4gIH1cblxuICBnZXREYXRlc09mV2VlayhpbmRleERheTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIHRoaXMuZGF5IC0gdGhpcy5nZXRXaG9sZVdlZWsoKVswXSk7XG4gICAgcmV0dXJuIHN0YXJ0RGF0ZS5nZXREYXRlKCkgKyBpbmRleERheTtcbiAgfVxuXG4gIHJlc2V0Q291bnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1Db3VudGVyID0gMDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbFZpZXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbFZpZXcgPT0gbnVsbCkge1xuICAgICAgdGhpcy5pbml0aWFsVmlldyA9ICdtb250aCc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0aWFsRGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgZGF0ZTogRGF0ZTtcbiAgICBpZiAodGhpcy5pbml0aWFsRGF0ZSA9PSBudWxsKSB7XG4gICAgICBkYXRlID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGUgPSB0aGlzLmluaXRpYWxEYXRlO1xuICAgIH1cbiAgICB0aGlzLnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgdGhpcy5tb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICB0aGlzLmRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0V2ZW50cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ldmVudHMgPT09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdOTyBFVkVOVFMnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFdob2xlV2VlaygpOiBudW1iZXJbXSB7XG4gICAgc3dpdGNoIChuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIHRoaXMuZGF5ICsgMSkuZ2V0RGF5KCkpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFs2LCAwXTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIFswLCA2XTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIFsxLCA1XTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIFsyLCA0XTtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgcmV0dXJuIFszLCAzXTtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgcmV0dXJuIFs0LCAyXTtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgcmV0dXJuIFs1LCAxXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVCdXR0b25zKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZpZXdzID09IG51bGwpIHtcbiAgICAgIHRoaXMubUJ0biA9IHRydWU7XG4gICAgICB0aGlzLndCdG4gPSB0cnVlO1xuICAgICAgdGhpcy5kQnRuID0gdHJ1ZTtcbiAgICAgIHRoaXMuZEJ0biA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoY29uc3QgYnRuIG9mIHRoaXMudmlld3MpIHtcbiAgICAgICAgc3dpdGNoIChidG4pIHtcbiAgICAgICAgICBjYXNlICd5ZWFyJzoge1xuICAgICAgICAgICAgdGhpcy55QnRuID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdtb250aCc6IHtcbiAgICAgICAgICAgIHRoaXMubUJ0biA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAnd2Vlayc6IHtcbiAgICAgICAgICAgIHRoaXMud0J0biA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FzZSAnZGF5Jzoge1xuICAgICAgICAgICAgdGhpcy5kQnRuID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSXRlbSB7XG5cbiAgaXRlbUlkPzogbnVtYmVyO1xuICBsaXN0PzogTGlzdDtcbiAgdGl0bGU6IHN0cmluZztcbiAgY29sb3I/OiBzdHJpbmc7XG4gIGRhdGVPZkV4cGlyeTogRGF0ZTtcbn1cblxuZXhwb3J0IGNsYXNzIExpc3Qge1xuXG4gIGxpc3RJZD86IG51bWJlcjtcbiAgaXRlbT86IEl0ZW1bXTtcbiAgdGl0bGU/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGRhdGVPZkV4cGlyeT86IERhdGU7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhbCB7XG4gIHdlZWtkYXlzID8gPSBbJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JywgJ1N1biddO1xuICBtb250aHMgPyA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuICBvdGhlcnMgPyA9IFsnWWVhcicsICdXZWVrJywgJ01vbnRoJywgJ0RheScsICdUb2RheScsICdBbGwgRGF5J107XG59XG5cbiJdfQ==