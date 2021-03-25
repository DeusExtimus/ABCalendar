(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('abcalendar', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.abcalendar = {}, global.ng.core, global.ng.common));
}(this, (function (exports, i0, common) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    var AbcalendarLibService = /** @class */ (function () {
        function AbcalendarLibService() {
        }
        return AbcalendarLibService;
    }());
    AbcalendarLibService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function AbcalendarLibService_Factory() { return new AbcalendarLibService(); }, token: AbcalendarLibService, providedIn: "root" });
    AbcalendarLibService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    AbcalendarLibService.ctorParameters = function () { return []; };

    var AbcalendarLibComponent = /** @class */ (function () {
        function AbcalendarLibComponent() {
            this.eventEmitter = new i0.EventEmitter();
        }
        AbcalendarLibComponent.prototype.ngOnInit = function () {
        };
        AbcalendarLibComponent.prototype.setEvent = function ($event) {
            this.eventEmitter.emit($event);
        };
        return AbcalendarLibComponent;
    }());
    AbcalendarLibComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lib-abcalendar-lib',
                    template: "\n    <lib-calendar\n      [views]=\"views\"\n      [initialView]=\"initialView\"\n      [initialDate]=\"initialDate\"\n      [events]=\"events\"\n      (eventClick)=\"setEvent($event)\"\n      [localeValue]=\"localeValue\"\n    ></lib-calendar>\n  "
                },] }
    ];
    AbcalendarLibComponent.ctorParameters = function () { return []; };
    AbcalendarLibComponent.propDecorators = {
        initialView: [{ type: i0.Input }],
        initialDate: [{ type: i0.Input }],
        events: [{ type: i0.Input }],
        views: [{ type: i0.Input }],
        localeValue: [{ type: i0.Input }],
        eventEmitter: [{ type: i0.Output }]
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var CalendarComponent = /** @class */ (function () {
        function CalendarComponent() {
            this.eventClick = new i0.EventEmitter();
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
        CalendarComponent.setMonthAndDayFormat = function (day, month) {
            var monthAndDay = [' ', ' '];
            // day
            if (day < 10) {
                monthAndDay[0] = "0" + day;
            }
            else {
                monthAndDay[0] = day.toString();
            }
            // month
            if (month < 10) {
                monthAndDay[1] = "0" + month;
            }
            else {
                monthAndDay[1] = month.toString();
            }
            return monthAndDay;
        };
        CalendarComponent.prototype.ngOnInit = function () {
            this.setInitialView();
            this.setInitialDate();
            this.checkEvents();
            this.prepareButtons();
            this.setLocaleForCalendar();
        };
        CalendarComponent.prototype.getMonthsForLocale = function (locale) {
            var format = new Intl.DateTimeFormat(locale, { month: 'long' });
            var months = [];
            for (var month = 0; month < 12; month++) {
                var dateToFormat = new Date(Date.UTC(2000, month, 1, 0, 0, 0));
                months.push(format.format(dateToFormat));
            }
            return months;
        };
        CalendarComponent.prototype.getWeekdaysForLocale = function (locale) {
            var format = new Intl.DateTimeFormat(locale, { weekday: 'long' });
            var weekdays = [];
            for (var weekday = 0; weekday < 6; weekday++) {
                var dateToFormat = new Date(Date.UTC(2000, weekday, 1, 0, 0, 0));
                weekdays.push(format.format(dateToFormat));
            }
            return weekdays;
        };
        CalendarComponent.prototype.numSequence = function (n) {
            return Array(n);
        };
        CalendarComponent.prototype.getDaysOfMonth = function (f) {
            var firstDay;
            if (f == null) {
                firstDay = new Date(this.year, this.month + 1, 0);
            }
            else {
                firstDay = new Date(this.year, f + 1, 0);
            }
            return firstDay.getDate();
        };
        CalendarComponent.prototype.getEmptyStartDays = function (f) {
            var firstDay;
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
        };
        CalendarComponent.prototype.getEmptyEndDays = function (f) {
            var daysOfMonth = this.getDaysOfMonth(f);
            var getEmptyStartDay = this.getEmptyStartDays(f);
            return 42 - daysOfMonth - getEmptyStartDay;
        };
        CalendarComponent.prototype.prev = function () {
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
        };
        CalendarComponent.prototype.currentDay = function () {
            this.year = this.today.getFullYear();
            this.month = this.today.getMonth();
            this.day = this.today.getDate();
        };
        CalendarComponent.prototype.next = function () {
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
        };
        CalendarComponent.prototype.setTitle = function () {
            switch (this.initialView) {
                case 'year':
                    return this.year.toString();
                case 'month':
                    return this.localeValue.months[this.month] + " " + this.year.toString();
                case 'week':
                    var wholeWeek = this.getWholeWeek();
                    var startDate = new Date(this.year, this.month, this.day - wholeWeek[0]);
                    var endDate = new Date(this.year, this.month, this.day + wholeWeek[1]);
                    var formattedStartDate = CalendarComponent.setMonthAndDayFormat(startDate.getDate() + 1, startDate.getMonth() + 1);
                    var formattedEndDate = CalendarComponent.setMonthAndDayFormat(endDate.getDate() + 1, endDate.getMonth() + 1);
                    var startDay = formattedStartDate[0] + "." + formattedStartDate[1];
                    var endDay = formattedEndDate[0] + "." + formattedEndDate[1] + "." + endDate.getFullYear();
                    return startDay + " - " + endDay;
                case 'day':
                    var formattedDate = CalendarComponent.setMonthAndDayFormat(this.day, this.month + 1);
                    return formattedDate[0] + "." + formattedDate[1] + "." + this.year;
            }
        };
        CalendarComponent.prototype.getItemColor = function (item) {
            if (item.color == null || !item.color.match(/^#([0-9a-f]{3}){1,2}$/i)) {
                return '#e7e2e2';
            }
            else {
                return item.color;
            }
        };
        CalendarComponent.prototype.getTextColor = function (backgroundColor) {
            var r = parseInt(backgroundColor.substring(1, 3), 16);
            var g = parseInt(backgroundColor.substring(3, 5), 16);
            var b = parseInt(backgroundColor.substring(5, 7), 16);
            var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return luminance > 0.5 ? '#000000' : '#FFFFFF';
        };
        CalendarComponent.prototype.correctDate = function (item, day, month) {
            if (month == null) {
                month = this.month;
            }
            var dateToCheck = new Date(this.year, month, day + 1, 1, 0, 0, 0);
            var itemDate = new Date(item.dateOfExpiry);
            var isCurrentDate = itemDate.getFullYear() === dateToCheck.getFullYear() &&
                itemDate.getMonth() === dateToCheck.getMonth() &&
                dateToCheck.getDate() === itemDate.getDate();
            if (isCurrentDate) {
                this.itemCounter++;
                return true;
            }
            else {
                return false;
            }
        };
        CalendarComponent.prototype.isToLate = function () {
            return this.itemCounter <= 3;
        };
        CalendarComponent.prototype.colorOfTheDay = function (dayNumber, rightMonth) {
            var a;
            if (rightMonth == null) {
                a = Date.UTC(this.year, new Date(Date.now()).getMonth(), dayNumber + 1);
            }
            else {
                a = Date.UTC(this.year, rightMonth, dayNumber + 1);
            }
            var b = Date.UTC(this.year, this.month, this.today.getDate());
            if (a === b) {
                return '#ececf5';
            }
        };
        CalendarComponent.prototype.getHoursOfDay = function (hours) {
            if (hours >= 10) {
                return hours.toString();
            }
            else {
                return "0" + hours;
            }
        };
        CalendarComponent.prototype.isAllDayItem = function (item) {
            return new Date(item.dateOfExpiry).getDate() === this.day;
        };
        CalendarComponent.prototype.getDatesOfWeek = function (indexDay) {
            var startDate = new Date(this.year, this.month, this.day - this.getWholeWeek()[0]);
            return startDate.getDate() + indexDay;
        };
        CalendarComponent.prototype.resetCounter = function () {
            this.itemCounter = 0;
        };
        CalendarComponent.prototype.setInitialView = function () {
            if (this.initialView == null) {
                this.initialView = 'month';
            }
        };
        CalendarComponent.prototype.setInitialDate = function () {
            var date;
            if (this.initialDate == null) {
                date = new Date(Date.now());
            }
            else {
                date = this.initialDate;
            }
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.day = date.getDate();
        };
        CalendarComponent.prototype.checkEvents = function () {
            if (this.events === null) {
                console.log('NO EVENTS');
            }
        };
        CalendarComponent.prototype.getWholeWeek = function () {
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
        };
        CalendarComponent.prototype.prepareButtons = function () {
            var e_1, _a;
            if (this.views == null) {
                this.mBtn = true;
                this.wBtn = true;
                this.dBtn = true;
                this.yBtn = true;
            }
            else {
                try {
                    for (var _b = __values(this.views), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var btn = _c.value;
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
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        CalendarComponent.prototype.setLocaleForCalendar = function () {
            if (this.localeValue == null) {
                this.localeValue = this.defLocales.localeEn;
            }
            else if (this.localeValue.lang === 'en-En' || this.localeValue.lang === 'en-US') {
                this.localeValue = this.defLocales.localeEn;
            }
            else if ('de-De') {
                this.localeValue = this.defLocales.localeDe;
            }
        };
        return CalendarComponent;
    }());
    CalendarComponent.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function CalendarComponent_Factory() { return new CalendarComponent(); }, token: CalendarComponent, providedIn: "root" });
    CalendarComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lib-calendar',
                    template: "<div class=\"container-fluid\">\n  <div class=\"ml-5 mr-5 text-center\">\n    <!--  HEADER-->\n    <div class=\"row mt-5\">\n      <div class=\"col-4\">\n        <div class=\"btn-group\" role=\"group\">\n          <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"prev()\"> &#60;</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\"\n                  (click)=\"currentDay()\">{{localeValue.others[4]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"next()\">&#62;</button>\n        </div>\n      </div>\n      <div class=\"col-4 text-center\"><h1>{{setTitle()}}</h1></div>\n      <div class=\"col-4\">\n        <div class=\"btn-group text-right\" role=\"group\">\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"yBtn\"\n                  (click)=\"initialView = 'year'; itemCounter = 0\">{{localeValue.others[0]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"mBtn\"\n                  (click)=\"initialView = 'month'; itemCounter = 0\">{{localeValue.others[2]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"wBtn\"\n                  (click)=\"initialView = 'week'; itemCounter = 0\">{{localeValue.others[1]}}</button>\n          <button type=\"button\" class=\"btn btn-outline-dark\" *ngIf=\"dBtn\"\n                  (click)=\"initialView = 'day'; itemCounter = 0\">{{localeValue.others[3]}}</button>\n        </div>\n      </div>\n    </div>\n\n    <!--JAHRESANSICHT-->\n    <div class=\"row\" *ngIf=\"initialView =='year'\">\n      <div *ngFor=\"let column of numSequence(12); let f = index;\" class=\"col-lg-4 mt-3\">\n        <div class=\"border\">\n          <div class=\"col-12 justify-content-center\">\n            <!--            Monthnames-->\n            <div class=\"container-fluid text-center\">\n              <h5 style=\"font-weight: bolder\">{{localeValue.months[f]}}</h5>\n            </div>\n            <div class=\"row\">\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\n              <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\n\n              <div *ngFor=\"let beforeDay of numSequence(getEmptyStartDays(f)); let ac = index;\"\n                   class=\"border w-14 h-117px\">\n              </div>\n              <div *ngFor=\"let currentDay of numSequence(getDaysOfMonth(f)); let dayNumber = index;\"\n                   class=\"border text-left w-14 h-117px\"\n                   [ngStyle]=\"{'background-color': colorOfTheDay(dayNumber, f)}\">\n                <div class=\"ml-2\">\n                  {{dayNumber + 1}}\n                  {{resetCounter()}}\n                </div>\n                <div *ngFor=\"let item of events\">\n                  <div *ngIf=\"itemCounter < 3\">\n                    <div *ngIf=\"correctDate(item, dayNumber, f)\" class=\"border border-dark rounded m-1\"\n                         [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                      <div class=\"ml-1 crop pointer\" (click)=\"eventClick.emit(item)\">\n                        {{item.title}}\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div *ngFor=\"let afterDay of numSequence(getEmptyEndDays(f)); let daysOfNextMonth = index;\"\n                   class=\"border w-14 h-117px lg\">\n                {{daysOfNextMonth + 1}}\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!--MONATSANSICHT-->\n    <div *ngIf=\"initialView == 'month'\">\n      <div class=\"row\">\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\n        <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\n        <div *ngFor=\"let beforeday of numSequence(getEmptyStartDays()); let ac = index;\"\n             class=\"border w-14 h-117px\">\n        </div>\n        <div *ngFor=\"let currentday of numSequence(getDaysOfMonth()); let dayNumber = index\"\n             class=\"border text-left w-14 h-117px\" [ngStyle]=\"{'background-color': colorOfTheDay(dayNumber)}\">\n          <div class=\"ml-2\">\n            {{dayNumber + 1}}\n            {{resetCounter()}}\n          </div>\n          <div *ngFor=\"let item of events\">\n            <div *ngIf=\"itemCounter < 3\">\n              <div *ngIf=\"correctDate(item, dayNumber)\">\n                <div class=\"ml-1 border border-dark rounded m-1 crop pointer\" (click)=\"eventClick.emit(item)\"\n                     [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                  {{item.title}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div *ngFor=\"let afterday of numSequence(getEmptyEndDays()); let daysOfNextMonth = index;\"\n             class=\"border text-left w-14 h-117px lg\">\n          <div class=\"ml-2\">\n            {{daysOfNextMonth + 1}}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!--WOCHENANSICHT-->\n    <div *ngIf=\"initialView == 'week'\">\n      <div class=\"justify-content-center\">\n        <div class=\"border border-light\">\n          <div class=\"row\">\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[0]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[1]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[2]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[3]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[4]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[5]}}</h5></div>\n            <div class=\"bg-dark text-center w-14\"><h5 class=\"lg\">{{localeValue.weekdays[6]}}</h5></div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div *ngFor=\"let counter of numSequence(7); let days = index\" class=\"w-14 border border-grey week-height\"\n               [ngStyle]=\"{'background-color': colorOfTheDay(getDatesOfWeek(days))}\">\n            <div *ngFor=\"let item of events\">\n              <div *ngIf=\"correctDate(item, getDatesOfWeek(days))\" class=\"m-1\">\n                <div class=\"rounded w-100 border border-dark crop pointer\" (click)=\"eventClick.emit(item)\"\n                     [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                  {{item.title}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!--TAGESANSICHT-->\n    <div *ngIf=\"initialView == 'day'\">\n      <div class=\"row justify-content-center\">\n        <div class=\"w-100\">\n          <div class=\"row\">\n            <div class=\"border border-grey w-14 bg-dark min-height\">\n              <div class=\"lg\">\n                {{localeValue.others[5]}}\n              </div>\n            </div>\n            <div class=\"w-85\">\n              <div *ngFor=\"let item of events\">\n                <div *ngIf=\"isAllDayItem(item) && correctDate(item, day - 1)\">\n                  <div class=\"border border-grey h-50 justify-content-center\">\n                    <div class=\"rounded w-100 border border-dark crop pointer\" (click)=\"eventClick.emit(item)\"\n                         [ngStyle]=\"{'background-color': getItemColor(item), 'color': getTextColor(getItemColor(item))}\">\n                      {{item.title}}\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"h-2px\"></div>\n          <div *ngFor=\"let counter of numSequence(24); let hours = index; \">\n            <div class=\"row\">\n              <div class=\"border border-grey w-14 bg-dark h-50px\">\n                <div class=\"lg\">\n                  {{getHoursOfDay(hours)}}\n                </div>\n              </div>\n              <div class=\"w-85\">\n                <div class=\"border border-grey h-50\"></div>\n                <div class=\"border border-grey h-50\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n  <div class=\"container h-50px\"></div>\n</div>\n",
                    styles: [".w-14{width:14.2857%}.w-85{width:85.7143%}.pointer{cursor:pointer}.h-2px{height:2px}.h-50px{height:50px}.h-100px{height:100px}.h-117px{height:119px}.lg{color:#d3d3d3}.min-height{min-height:50px}.week-height{height:300px}.border-grey{border-color:#8f8f8f}.crop{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"]
                },] },
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    CalendarComponent.propDecorators = {
        initialView: [{ type: i0.Input }],
        initialDate: [{ type: i0.Input }],
        events: [{ type: i0.Input }],
        views: [{ type: i0.Input }],
        localeValue: [{ type: i0.Input }],
        eventClick: [{ type: i0.Output }]
    };
    var Item = /** @class */ (function () {
        function Item() {
        }
        return Item;
    }());
    var List = /** @class */ (function () {
        function List() {
        }
        return List;
    }());
    var Local = /** @class */ (function () {
        function Local() {
        }
        return Local;
    }());

    var AbcalendarLibModule = /** @class */ (function () {
        function AbcalendarLibModule() {
        }
        return AbcalendarLibModule;
    }());
    AbcalendarLibModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [AbcalendarLibComponent, CalendarComponent],
                    imports: [
                        common.CommonModule
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

    exports.AbcalendarLibModule = AbcalendarLibModule;
    exports.AbcalendarLibService = AbcalendarLibService;
    exports.CalendarComponent = CalendarComponent;
    exports.Item = Item;
    exports.List = List;
    exports.Local = Local;
    exports.ɵa = AbcalendarLibComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=abcalendar.umd.js.map
