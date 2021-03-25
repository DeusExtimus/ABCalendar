import { NgModule } from '@angular/core';
import { AbcalendarLibComponent } from './abcalendar-lib.component';
import {CalendarComponent} from './calendar/calendar.component';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [AbcalendarLibComponent, CalendarComponent],
  imports: [
    CommonModule
  ],
  exports: [AbcalendarLibComponent]
})
export class AbcalendarLibModule { }
