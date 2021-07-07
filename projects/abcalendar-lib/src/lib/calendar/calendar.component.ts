import {Component, DoCheck, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, DoCheck {

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
  @Input()
  useTitle: boolean;

  @Output()
  eventClick = new EventEmitter<Item>();
  @Output()
  eventChange = new EventEmitter<Item>();
  @Output()
  dayClick = new EventEmitter<Date>();
  @Output()
  dateChange = new EventEmitter<Date>();
  @Output()
  viewChange = new EventEmitter<string>();

  today: Date = new Date(Date.now());
  date: Date;

  dragged: Item;

  differ: KeyValueDiffer<string, any>;

  yBtn: boolean;
  mBtn: boolean;
  wBtn: boolean;
  dBtn: boolean;
  title: string;

  constructor(private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }

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

  private static calendarLenght(item: Item, date: Date, tempArray: Item[]): void {
    let itemDay = new Date(item.startDate);
    while (itemDay.setHours(0, 0, 0, 0) <= item.endDate.setHours(0, 0, 0, 0)) {
      if (itemDay.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
        tempArray.push(item);
      }
      itemDay = new Date(itemDay.setDate(itemDay.getDate() + 1));
    }
  }

  ngOnInit(): void {
    this.setInitialView();
    this.setInitialDate();
    this.checkEvents();
    this.prepareButtons();
    this.setLocaleForCalendar();
    this.setTheme();
    this.setTitle();
    this.setTitleUsage();
  }

  ngDoCheck(): void {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem(item => {
        if (item.key === 'initialView' || item.key === 'date') {
          this.setTitle();
        }
      });
    }
  }

  getNumberInRightLang(num: number): string {
    return num.toLocaleString(this.language);
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  monthDays(month?: number): Date[] {
    if (month == null) {
      month = this.date.getMonth();
    }
    const days: Date[] = [];
    let startDate = new Date(this.date.getFullYear(), month, 0);
    for (let i = 1; i <= this.getDaysOfMonth(month); i++) {
      days.push(startDate);
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    }
    return days;
  }

  daysOfPrevMonth(month?: number, year?: number): Date[] {
    if (month == null) {
      month = this.date.getMonth();
    }
    if (year == null) {
      year = this.date.getFullYear();
    }
    const emptyStartDays = this.getEmptyStartDays(month);
    const dateArray: Date[] = [];
    for (let day = 1; day <= emptyStartDays; day++) {
      const currentMonthsFirst = new Date(year, month, 1);
      currentMonthsFirst.setDate(currentMonthsFirst.getDate() - day);
      dateArray.push(currentMonthsFirst);
    }
    return [...dateArray].sort((a: Date, b: Date) => (a.getDate() - b.getDate()));
  }

  daysOfNextMonth(month?: number): Date[] {
    if (month == null) {
      month = this.date.getMonth();
    }
    const days: Date[] = [];
    let startDate = new Date(this.date.getFullYear(), month + 1, 0);
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
      this.date = new Date(this.date.getFullYear() - 1, this.date.getMonth(), this.date.getDate());
    } else if (this.initialView === 'month') {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, this.date.getDate());
    } else if (this.initialView === 'week') {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 7);
    } else {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 1);
    }
    this.dateChange.emit(this.date);
  }

  currentDay(): void {
    this.date = new Date(Date.now());
    this.dateChange.emit(this.date);
  }

  next(): void {
    if (this.initialView === 'year') {
      this.date = new Date(this.date.getFullYear() + 1, this.date.getMonth(), this.date.getDate());
    } else if (this.initialView === 'month') {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate());
    } else if (this.initialView === 'week') {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 7);
    } else {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1);
    }
    this.dateChange.emit(this.date);
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

  colorOfTheDay(dayNumber: number, rightMonth?: number): string {
    if (rightMonth == null) {
      rightMonth = this.date.getMonth();
    }
    const compareableDate = new Date(this.date.getFullYear(), rightMonth, dayNumber);
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
    if (new Date(item.startDate).getDate() === this.date.getDate()) {
      if (item.endDate != null) {
        return item.startDate.getHours() === item.endDate.getHours();
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  daysOfWeek(): Date[] {
    let startDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - this.date.getDay());
    startDate.setDate(startDate.getDate());
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
    this.viewChange.emit(this.initialView);
  }

  emitDayClick(dayNumber: number, month?: number): void {
    if (month == null) {
      month = this.date.getMonth();
    }
    const date = new Date(this.date.getFullYear(), month, dayNumber);
    this.dayClick.emit(date);
  }

  emitDayClickAfterDays(dayNumber: number, f?: number): void {
    if (f == null) {
      f = this.date.getMonth();
    }
    const date = new Date(this.date.getFullYear(), f + 1, dayNumber + 1);
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
      monthNum = this.date.getMonth();
    }

    const date = new Date(this.date.getFullYear(), monthNum, dayNumber);

    // get relevant Events
    for (const item of this.events) {
      if (item.singleDay === false) {
        CalendarComponent.calendarLenght(item, date, tempArray);
      } else {
        this.pushSingleDayToArray(item, monthNum, dayNumber, tempArray);
      }
    }

    // set eventLenght
    for (const item of tempArray) {
      if (!item.singleDay) {
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

  rightMultiDayEvents(dayNumber: number, monthNum: number): Item[] {
    const tempArray: Item[] = [];
    // handle null values
    if (this.events == null) {
      console.log('NO EVENTS');
      return;
    }
    const date = new Date(this.date.getFullYear(), monthNum, dayNumber);
    // get relevant Events
    for (const item of this.events) {
      if (item.singleDay === false) {
        CalendarComponent.calendarLenght(item, date, tempArray);
      }
    }
    // set eventLenght
    for (const item of tempArray) {
      if (!item.singleDay) {
        item.eventLenght = item.endDate.setHours(0, 0, 0, 0) - item.startDate.setHours(0, 0, 0, 0);
      }
    }
    // sorting
    if (!tempArray || tempArray.length <= 1) {
      return tempArray;
    } else {
      return [...tempArray].sort(this.comperateEventLenght());
    }
  }

  rightSingleDayEvents(dayNumber: number, monthNum: number): Item[] {
    const tempArray: Item[] = [];
    // handle null values
    if (this.events == null) {
      console.log('NO EVENTS');
      return;
    }

    // get relevant Events
    for (const item of this.events) {
      if (item.singleDay) {
        this.pushSingleDayToArray(item, monthNum, dayNumber, tempArray);
      }
    }

    // set eventLenght
    for (const item of tempArray) {
      item.eventLenght = 1;
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
      month = this.date.getMonth();
    }
    const date = new Date(this.date.getFullYear(), month, dayNumber);
    return item.startDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0);
  }

  isEndDate(item: Item, dayNumber: number, month?: number): boolean {
    if (month == null) {
      month = this.date.getMonth();
    }
    const date = new Date(this.date.getFullYear(), month, dayNumber);
    if (item.startDate !== item.endDate) {
      return item.endDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0);
    }
  }

  startDayIsEndDay(item: Item): boolean {
    return item.startDate === item.endDate;
  }

  eventForHour(hour: number): Item[] {
    const tempArray: Item[] = [];
    for (const item of this.events) {
      if (!this.isAllDayItem(item) && this.correctDate(item, this.date.getDate())) {
        if (this.itemIsInTime(item, hour)) {
          tempArray.push(item);
        }
      }
    }
    return tempArray;
  }

  setNewDate(currentDay: Date, e: any): void {
    if (currentDay !== this.dragged.startDate && e.screenX === 0 && e.screenY === 0 && e.clientX === 0) {
      this.dragged.startDate = currentDay;
      for (const item of this.events) {
        if (item.itemId === this.dragged.itemId) {
          item.startDate = this.dragged.startDate;
          this.eventChange.emit(item);
        }
      }
    }
  }

  private correctDate(item: Item, day: number, month?: number): boolean {
    if (month == null) {
      month = this.date.getMonth();
    }
    const dateToCheck = new Date(this.date.getFullYear(), month, day, 1, 0, 0, 0);
    const itemDate = new Date(item.startDate);
    return itemDate.getFullYear() === dateToCheck.getFullYear() &&
      itemDate.getMonth() === dateToCheck.getMonth() &&
      dateToCheck.getDate() === itemDate.getDate();
  }

  private itemIsInTime(item: Item, hour: number): boolean {
    let i = item.startDate.getHours();
    let isTrue = false;
    if (item.endDate != null) {
      while (i <= item.endDate.getHours()) {
        if (i === hour && this.date.getDate() === item.startDate.getDate()) {
          isTrue = true;
          break;
        }
        i++;
      }
    }
    return isTrue;
  }

  private pushSingleDayToArray(item: Item, monthNum: number, dayNumber: number, tempArray: Item[]): void {
    item.startDate = item.endDate = new Date(item.startDate.setHours(0, 0, 0, 0));
    const newDate = new Date(this.date.getFullYear(), monthNum, dayNumber);
    if (newDate.setHours(0, 0, 0, 0) === item.startDate.setHours(0, 0, 0, 0)) {
      tempArray.push(item);
    }
  }

  private comperateEventLenght(): (a: any, b: any) => number {
    const property = 'eventLenght';
    return (a, b) => {
      return (a[property] - b[property]) * -1;
    };
  }

  private setTitle(): void {
    switch (this.initialView) {
      case 'year':
        this.title = this.date.getFullYear().toString();
        break;
      case 'month':
        this.title = `${this.localeValue.months[this.date.getMonth()]} ${this.date.getFullYear().toString()}`;
        break;
      case 'week':
        const wholeWeek = this.daysOfWeek();

        const formattedStartDate = CalendarComponent.setMonthAndDayFormat(wholeWeek[0].getDate(), wholeWeek[0].getMonth() + 1);
        const formattedEndDate = CalendarComponent.setMonthAndDayFormat(wholeWeek[6].getDate(), wholeWeek[6].getMonth() + 1);

        const startDay = `${formattedStartDate[0]}.${formattedStartDate[1]}`;
        const endDay = `${formattedEndDate[0]}.${formattedEndDate[1]}.${wholeWeek[6].getFullYear()}`;
        this.title = `${startDay} - ${endDay}`;
        break;
      case 'day':
        const formattedDate = CalendarComponent.setMonthAndDayFormat(this.date.getDate(), this.date.getMonth() + 1);
        this.title = `${formattedDate[0]}.${formattedDate[1]}.${this.date.getFullYear()}`;
        break;
    }
  }

  private setInitialDate(): void {
    this.date = this.initialDate || new Date(Date.now());
  }

  private checkEvents(): void {
    if (this.events === null) {
      console.log('NO EVENTS');
    } else {
      for (const event of this.events) {
        if (event.singleDay == null) {
          if (event.endDate == null) {
            event.singleDay = true;
          } else {
            event.singleDay = event.startDate.setHours(0, 0, 0, 0) === event.endDate.setHours(0, 0, 0, 0);
          }
        }
      }
    }
  }

  private prepareButtons(): void {
    const tempArray = [];
    if (this.views == null) {
      this.setAllButtonsTrue();
    } else {
      if (this.views.length > 4) {
        console.error(`View Lenght [${this.views.length}] is to long. Maximal 4 views allowed.`);
        this.setAllButtonsTrue();
      }
      for (const btn of this.views) {
        const tempObj = {id: 5, view: btn};
        switch (btn) {
          case 'year': {
            this.yBtn = true;
            tempObj.id = 1;
            break;
          }
          case 'month': {
            this.mBtn = true;
            tempObj.id = 2;
            break;
          }
          case 'week': {
            this.wBtn = true;
            tempObj.id = 3;
            break;
          }
          case 'day': {
            this.dBtn = true;
            tempObj.id = 4;
            break;
          }
          default: {
            console.error(`Please watch the spelling of your View: ${btn}`);
          }
        }
        if (tempObj.id >= 1 && tempObj.id <= 4) {
          tempArray.push(tempObj);
        }
      }
      tempArray.sort((a, b) => a.id - b.id);
      this.views = [];
      for (const tempOb of tempArray) {
        this.views.push(tempOb.view);
      }
    }
  }

  private setAllButtonsTrue(): void {
    this.yBtn = true;
    this.mBtn = true;
    this.wBtn = true;
    this.dBtn = true;
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

  private getDaysOfMonth(f?: number): number {
    let firstDay: Date;
    if (f == null) {
      firstDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    } else {
      firstDay = new Date(this.date.getFullYear(), f + 1, 0);
    }
    return firstDay.getDate();
  }

  private getEmptyStartDays(month?: number): number {
    let firstDay;
    if (month == null) {
      firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    } else {
      firstDay = new Date(this.date.getFullYear(), month, 1);
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

  private setTheme(): void {
    if (this.theme === 'light' || this.theme === 'Light') {
      this.theme = 'light';
    } else if (this.theme === 'night' || this.theme === 'Night') {
      this.theme = 'night';
    } else {
      this.theme = 'dark';
    }
  }

  private setTitleUsage(): void {
    this.useTitle = this.useTitle || typeof this.useTitle === 'string';
  }

  goToParentView(): void {
    if (this.views.length > 1) {
      for (let i = 0; i < this.views.length; i++) {
        if (this.views[i] === this.initialView && i !== 0) {
          this.initialView = this.views[i - 1];
        }
      }
    }
  }

}

export interface Item {
  itemId?: number;
  list?: List;
  title: string;
  color?: string;
  singleDay?: boolean;
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
