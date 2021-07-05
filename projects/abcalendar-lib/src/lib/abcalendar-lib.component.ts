import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item, Local} from './calendar/calendar.component';

@Component({
  selector: 'lib-abcalendar-lib',
  template: `
    <lib-calendar
      [views]="abConfig.views"
      [initialView]="abConfig.initialView"
      [initialDate]="abConfig.initialDate"
      [events]="abConfig.events"
      [localeValue]="abConfig.localeValue"
      [language]="abConfig.language"
      [theme]="abConfig.theme"
      (eventClick)="setEvent($event)"
      (eventChange)="changeEvent($event)"
      (dayClick)="setDay($event)"
      (dateChange)="setDateChange($event)"
      (viewChange)="setViewChange($event)"
    ></lib-calendar>
  `,
  styles: []
})
export class AbcalendarLibComponent {

  @Input()
  abConfig: AbConfig;

  // @Input()
  // initialView: string;
  // @Input()
  // initialDate: Date;
  // @Input()
  // events: Item[];
  // @Input()
  // views: string[];
  // @Input()
  // localeValue: Local;
  // @Input()
  // language: string;
  // @Input()
  // theme: string;
  @Output()
  eventEmitter = new EventEmitter<Item>();
  @Output()
  eventChanged = new EventEmitter<Item>();
  @Output()
  dayEmitter = new EventEmitter<Date>();
  @Output()
  dateChange = new EventEmitter<Date>();
  @Output()
  viewChange = new EventEmitter<string>();

  setEvent($event: Item): void {
    this.eventEmitter.emit($event);
  }

  changeEvent($event: Item): void {
    this.eventChanged.emit($event);
  }

  setDay($event: Date): void {
    this.dayEmitter.emit($event);
  }

  setDateChange($event: Date): void {
    this.dateChange.emit($event);
  }

  setViewChange($event: string): void {
    this.viewChange.emit($event);
  }
}

export interface AbConfig {
  initialView?: string;
  initialDate?: Date;
  events?: Item[];
  views?: string[];
  localeValue?: Local;
  language?: string;
  theme?: string;
}
