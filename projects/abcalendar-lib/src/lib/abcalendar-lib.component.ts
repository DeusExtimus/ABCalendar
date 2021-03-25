import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item, Local} from './calendar/calendar.component';

@Component({
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
  `,
  styles: []
})
export class AbcalendarLibComponent implements OnInit {

  constructor() {
  }

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
  eventEmitter = new EventEmitter<Item>();

  ngOnInit(): void {
  }

  setEvent($event: Item): void {
    this.eventEmitter.emit($event);
  }
}
