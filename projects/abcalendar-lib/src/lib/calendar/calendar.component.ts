import {OnInit, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  @Input()
  initialView: string;
  @Input()
  initialDate: Date;
  @Input()
  events: Item[];
  @Input()
  views: string[];
  @Input()
  localeValue: Local;
  @Input()
  language: string;
  @Input()
  theme: string;

  @Output()
  eventClick = new EventEmitter<Item>();
  @Output()
  dayClick = new EventEmitter<Date>();

  today: Date = new Date(Date.now());
  year: number;
  month: number;
  day: number;

  yBtn: boolean;
  mBtn: boolean;
  wBtn: boolean;
  dBtn: boolean;

  private static setMonthAndDayFormat(day: number, month: number): string[] {
    const monthAndDay: string[] = [' ', ' '];
    // day
    if (day < 10) {
      monthAndDay[0] = `0${day}`;
    } else {
      monthAndDay[0] = day.toString();
    }
    // month
    if (month < 10) {
      monthAndDay[1] = `0${month}`;
    } else {
      monthAndDay[1] = month.toString();
    }
    return monthAndDay;
  }

  private static setOthers(language: string): string[] {
    if (language.startsWith('en')) {
      return ['Year', 'Month', 'Week', 'Day', 'Today', 'All Day'];
    } else if (language.startsWith('de')) {
      return ['Jahr', 'Monat', 'Woche', 'Tag', 'Heute', 'Ganztägig'];
    } else if (language.startsWith('ru')) {
      return ['Год', 'Месяц', 'Неделя', 'День', 'Сегодня', 'Весь день'];
    } else if (language.startsWith('zh')) {
      return ['年份', '月份', '周', '日', '今天', '全天'];
    } else if (language.startsWith('es')) {
      return ['Año', 'Mes', 'Semana', 'Día', 'Hoy', 'Todo el día'];
    } else if (language.startsWith('it')) {
      return ['Anno', 'Mese', 'Settimana', 'Giorno', 'Oggi', 'Tutto il giorno'];
    } else if (language.startsWith('fr')) {
      return ['Année', 'Mois', 'Semaine', 'Jour', 'Aujourd\'hui', 'Toute la journée'];
    } else if (language.startsWith('ar')) {
      return ['عام', 'شهر', 'أسبوع', 'يوم - نهار', 'اليوم', 'طوال اليوم'];
    } else {
      console.log('The language ' + language + ' is not implemented yet.' +
        '\nPlease write an issue on the issue bord and watch out for updates.' +
        '\nIssue-Board:' +
        '\nhttps://github.com/DeusExtimus/ABCalendar/issues');
      return ['Year', 'Month', 'Week', 'Day', 'Today', 'All Day'];
    }
  }

  ngOnInit(): void {
    this.setInitialView();
    this.setInitialDate();
    this.checkEvents();
    this.prepareButtons();
    this.setLocaleForCalendar();
    this.setTheme();
  }

  getNumbersInRightLang(num: number): string {
    return num.toLocaleString(this.language);
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  getDaysOfMonth(f?: number): number {
    let firstDay: Date;
    if (f == null) {
      firstDay = new Date(this.year, this.month + 1, 0);
    } else {
      firstDay = new Date(this.year, f + 1, 0);
    }
    return firstDay.getDate();
  }

  monthDays(month?: number): Date[] {
    if (month == null) {
      month = this.month;
    }
    const days: Date[] = [];
    let startDate = new Date(this.year, month, 0);
    for (let i = 1; i <= this.getDaysOfMonth(month); i++) {
      days.push(startDate);
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    }
    return days;
  }

  getEmptyStartDays(f?: number): number {
    let firstDay: Date;
    if (f == null) {
      firstDay = new Date(this.year, this.month, 1);
    } else {
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

  daysOfNextMonth(month?: number): Date[] {
    if (month == null) {
      month = this.month;
    }
    const days: Date[] = [];
    let startDate = new Date(this.year, month + 1, 0);
    const daysOfMonth = this.getDaysOfMonth(month);
    const emptyStartDays = this.getEmptyStartDays(month);
    for (let i = 1; i <= 42 - daysOfMonth - emptyStartDays; i++) {
      days.push(startDate);
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    }
    return days;
  }

  prev(): void {
    if (this.initialView === 'year') {
      this.year--;
    } else if (this.initialView === 'month') {
      if (this.month > 0) {
        this.month--;
      } else {
        this.month = 11;
        this.year--;
      }
    } else if (this.initialView === 'week') {
      if (this.day - 7 < 0) {
        this.day = this.getDaysOfMonth(this.month - 1) + (this.day - 7);
        if (this.month === 0) {
          this.month = 11;
          this.year--;
        } else {
          this.month--;
        }
      } else {
        this.day = this.day - 7;
      }
    } else {
      if (this.day > 1) {
        this.day--;
      } else {
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

  currentDay(): void {
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();
    this.day = this.today.getDate();
  }

  next(): void {
    if (this.initialView === 'year') {
      this.year++;
    } else if (this.initialView === 'month') {
      if (this.month < 11) {
        this.month++;
      } else {
        this.month = 0;
        this.year++;
      }
    } else if (this.initialView === 'week') {
      if (this.day + 7 > this.getDaysOfMonth(this.month)) {
        this.day = this.day + 7 - this.getDaysOfMonth(this.month);
        if (this.month === 11) {
          this.month = 0;
          this.year++;
        } else {
          this.month++;
        }
      } else {
        this.day = this.day + 7;
      }
    } else {
      if (this.day < this.getDaysOfMonth(this.month) - 1) {
        this.day++;
      } else {
        this.day = 1;
        if (this.month < 11) {
          this.month++;
        } else {
          this.month = 0;
          this.year++;
        }
      }
    }
  }

  setTitle(): string {
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

  getItemColor(item: Item): string {
    if (item.color == null || !item.color.match(/^#([0-9a-f]{3}){1,2}$/i)) {
      return '#e7e2e2';
    } else {
      return item.color;
    }
  }

  getTextColor(backgroundColor: string): string {
    const r = parseInt(backgroundColor.substring(1, 3), 16);
    const g = parseInt(backgroundColor.substring(3, 5), 16);
    const b = parseInt(backgroundColor.substring(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }

  correctDate(item: Item, day: number, month?: number): boolean {
    if (month == null) {
      month = this.month;
    }
    const dateToCheck = new Date(this.year, month, day + 1, 1, 0, 0, 0);
    const itemDate = new Date(item.startDate);
    return itemDate.getFullYear() === dateToCheck.getFullYear() &&
      itemDate.getMonth() === dateToCheck.getMonth() &&
      dateToCheck.getDate() === itemDate.getDate();
  }

  colorOfTheDay(dayNumber: number, rightMonth?: number): string {
    if (rightMonth == null) {
      rightMonth = this.month;
    }
    const compareableDate = new Date(this.year, rightMonth, dayNumber);
    const comparisonDate = new Date(Date.now());
    if (compareableDate.setHours(0, 0, 0, 0) === comparisonDate.setHours(0, 0, 0, 0)) {
      if (this.theme !== 'night') {
        return '#d0d0f5';
      } else {
        return '#67676b';
      }
    }
  }

  getHoursOfDay(hours: number): string {
    const num = 0;
    if (hours >= 10) {
      return hours.toLocaleString(this.language);
    } else {
      return `${num.toLocaleString(this.language)}${hours.toLocaleString(this.language)}`;
    }
  }

  isAllDayItem(item: Item): boolean {
    return new Date(item.startDate).getDate() === this.day;
  }

  daysOfWeek(): Date[] {
    const current = new Date(this.year, this.month, this.day);
    let startDate = new Date(current.setDate((current.getDate() - current.getDay())));
    const days: Date[] = [];
    for (let i = 1; i <= 7; i++) {
      days.push(startDate);
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    }
    return days;
  }

  setInitialView(view?: string): void {
    if (view == null) {
      if (this.initialView == null) {
        this.initialView = 'month';
      }
    } else {
      this.initialView = view;
    }
  }

  emitDayClick(dayNumber: number, f?: number): void {
    if (f == null) {
      f = this.month;
    }
    const date = new Date(this.year, f, dayNumber + 1);
    this.dayClick.emit(date);
  }

  emitDayClickAfterDays(dayNumber: number, f?: number): void {
    let date;
    if (f == null) {
      f = this.month;
    }
    if (f + 1 < 12) {
      date = new Date(this.year, f + 1, dayNumber + 1);
    } else {
      date = new Date(this.year, f + 1, dayNumber + 1);
    }
    this.dayClick.emit(date);
  }

  showViewInRightLang(view: string): string {
    switch (view) {
      case 'year':
        return this.localeValue.others[0];
      case 'month':
        return this.localeValue.others[1];
      case 'week':
        return this.localeValue.others[2];
      case 'day':
        return this.localeValue.others[3];
    }
  }

  rightEvents(dayNumber: number, monthNum?: number): Item[] {
    const tempArray: Item[] = [];
    // handle null values
    if (this.events == null) {
      console.log('NO EVENTS');
      return;
    }
    if (monthNum == null) {
      monthNum = this.month;
    }

    const date = new Date(this.year, monthNum, dayNumber);

    // get relevant Events
    for (const item of this.events) {
      if (item.allDayItem === false) {
        let itemDay = new Date(item.startDate);
        while (itemDay.setHours(0, 0, 0, 0) <= item.endDate.setHours(0, 0, 0, 0)) {
          if (itemDay.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
            tempArray.push(item);
          }
          itemDay = new Date(itemDay.setDate(itemDay.getDate() + 1));
        }
      } else {
        item.startDate = item.endDate = new Date(item.startDate.setHours(0, 0, 0, 0));
        const newDate = new Date(this.year, monthNum, dayNumber);
        if (newDate.setHours(0, 0, 0, 0) === item.startDate.setHours(0, 0, 0, 0)) {
          tempArray.push(item);
        }
      }
    }

    // set eventLenght
    for (const item of tempArray) {
      if (!item.allDayItem) {
        item.eventLenght = item.endDate.setHours(0, 0, 0, 0) - item.startDate.setHours(0, 0, 0, 0);
      } else {
        item.eventLenght = 1;
      }
    }

    // sorting
    if (!tempArray || tempArray.length <= 1) {
      return tempArray;
    } else {
      return [...tempArray].sort(this.comperateEventLenght());
    }
  }

  isStartDate(item: Item, dayNumber: number, month?: number): boolean {
    if (month == null) {
      month = this.month;
    }
    const date = new Date(this.year, month, dayNumber);
    return item.startDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0);
  }

  isEndDate(item: Item, dayNumber: number, month?: number): boolean {
    if (month == null) {
      month = this.month;
    }
    const date = new Date(this.year, month, dayNumber);
    return item.endDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0);
  }

  startDayIsEndDay(item: Item): boolean {
    return item.startDate === item.endDate;
  }

  private comperateEventLenght(): (a: any, b: any) => number {
    const property = 'eventLenght';
    return (a, b) => {
      return (a[property] - b[property]) * -1;
    };
  }

  private setInitialDate(): void {
    let date: Date;
    if (this.initialDate == null) {
      date = new Date(Date.now());
    } else {
      date = this.initialDate;
    }
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();
  }

  private checkEvents(): void {
    if (this.events === null) {
      console.log('NO EVENTS');
    } else {
      for (const event of this.events) {
        if (event.allDayItem == null) {
          if (event.endDate == null) {
            event.allDayItem = true;
          } else {
            event.allDayItem = event.startDate.setHours(0, 0, 0, 0) === event.endDate.setHours(0, 0, 0, 0);
          }
        }
      }
    }
  }

  private getWholeWeek(): number[] {
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

  private prepareButtons(): void {
    if (this.views == null) {
      this.yBtn = true;
      this.mBtn = true;
      this.wBtn = true;
      this.dBtn = true;
    } else {
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

  private setLocaleForCalendar(): void {
    const weekday: string[] = [];
    const monthnames: string[] = [];
    if (this.language == null) {
      this.language = 'en-Us';
    }

    for (let date = 1; date < 8; date++) {
      const objDate = new Date(2021, 2, date);
      weekday.push(objDate.toLocaleString(this.language, {weekday: 'short'}));
    }
    for (let month = 0; month < 12; month++) {
      const objDate = new Date(2021, month, 1);
      monthnames.push(objDate.toLocaleString(this.language, {month: 'long'}));
    }

    this.localeValue = {weekdays: weekday, months: monthnames, others: CalendarComponent.setOthers(this.language)};
  }

  private setTheme(): void {
    if (this.theme === 'light' || this.theme === 'Light') {
      this.theme = 'light';
    } else if (this.theme === 'night' || this.theme === 'Night') {
      this.theme = 'night';
    } else {
      this.theme = 'dark';
    }
  }

}

export interface Item {
  itemId?: number;
  list?: List;
  title: string;
  color?: string;
  allDayItem?: boolean | false;
  startDate: Date;
  endDate?: Date;
  eventLenght?: number;
}

export interface List {
  listId?: number;
  item?: Item[];
  title?: string | undefined;
  dateOfExpiry?: Date;
}

export interface Local {
  weekdays?: string[];
  months?: string[];
  others?: string[];
}
