import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item, Local} from './calendar/calendar.component';

@Component({
  selector: 'lib-abcalendar-lib',
  template: `
    <lib-calendar
      [views]="views"
      [initialView]="initialView"
      [initialDate]="initialDate"
      [events]="events"
      [localeValue]="localeValue"
      [language]="language"
      [theme]="theme"
      (eventClick)="setEvent($event)"
      (eventChange)="changeEvent($event)"
      (dayClick)="setDay($event)"
    ></lib-calendar>
  `,
  styles: []
})
export class AbcalendarLibComponent {

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
  eventEmitter = new EventEmitter<Item>();
  @Output()
  eventChanged = new EventEmitter<Item>();
  @Output()
  dayEmitter = new EventEmitter<Date>();

  setEvent($event: Item): void {
    this.eventEmitter.emit($event);
  }

  changeEvent($event: Item): void {
    this.eventChanged.emit($event);
  }

  setDay($event: Date): void {
    this.dayEmitter.emit($event);
  }
}
