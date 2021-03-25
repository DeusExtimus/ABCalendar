import {Component, Input, OnInit, Output, EventEmitter, Injectable} from '@angular/core';

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

@Injectable({providedIn: 'root'})
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

  @Output()
  eventClick = new EventEmitter<Item>();

  today: Date = new Date(Date.now());
  year: number;
  month: number;
  day: number;

  yBtn = false;
  mBtn = false;
  wBtn = false;
  dBtn = false;

  itemCounter: number;

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

  ngOnInit(): void {
    this.setInitialView();
    this.setInitialDate();
    this.checkEvents();
    this.prepareButtons();
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

  getEmptyEndDays(f?: number): number {
    const daysOfMonth = this.getDaysOfMonth(f);
    const getEmptyStartDay = this.getEmptyStartDays(f);
    return 42 - daysOfMonth - getEmptyStartDay;
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
    const itemDate = new Date(item.dateOfExpiry);
    const isCurrentDate =
      itemDate.getFullYear() === dateToCheck.getFullYear() &&
      itemDate.getMonth() === dateToCheck.getMonth() &&
      dateToCheck.getDate() === itemDate.getDate();
    if (isCurrentDate) {
      this.itemCounter++;
      return true;
    } else {
      return false;
    }
  }

  isToLate(): boolean {
    return this.itemCounter <= 3;
  }

  colorOfTheDay(dayNumber: number, rightMonth?: number): string {
    let a;
    if (rightMonth == null) {
      a = Date.UTC(this.year, this.month, dayNumber + 1);
    } else {
      a = Date.UTC(this.year, rightMonth, dayNumber + 1);
    }
    const b = Date.UTC(this.year, this.month, this.today.getDate());
    if (a === b) {
      return '#ececf5';
    }
  }

  getHoursOfDay(hours: number): string {
    if (hours >= 10) {
      return hours.toString();
    } else {
      return `0${hours}`;
    }
  }

  isAllDayItem(item: Item): boolean {
    return new Date(item.dateOfExpiry).getDate() === this.day;
  }

  getDatesOfWeek(indexDay: number): number {
    const startDate = new Date(this.year, this.month, this.day - this.getWholeWeek()[0]);
    return startDate.getDate() + indexDay;
  }

  resetCounter(): void {
    this.itemCounter = 0;
  }

  private setInitialView(): void {
    if (this.initialView == null) {
      this.initialView = 'month';
    }
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
      this.mBtn = true;
      this.wBtn = true;
      this.dBtn = true;
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
}

export class Item {

  itemId?: number;
  list?: List;
  title: string;
  color?: string;
  dateOfExpiry: Date;
}

export class List {

  listId?: number;
  item?: Item[];
  title?: string | undefined;
  dateOfExpiry?: Date;
}

export class Local {
  weekdays ? = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  months ? = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  others ? = ['Year', 'Week', 'Month', 'Day', 'Today', 'All Day'];
}

