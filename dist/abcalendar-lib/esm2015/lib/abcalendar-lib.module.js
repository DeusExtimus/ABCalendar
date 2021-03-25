import { NgModule } from '@angular/core';
import { AbcalendarLibComponent } from './abcalendar-lib.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CommonModule } from '@angular/common';
export class AbcalendarLibModule {
}
AbcalendarLibModule.decorators = [
    { type: NgModule, args: [{
                declarations: [AbcalendarLibComponent, CalendarComponent],
                imports: [
                    CommonModule
                ],
                exports: [AbcalendarLibComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJjYWxlbmRhci1saWIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL25pY2xhcy5sYW5nL0Rlc2t0b3AvS2FsZW5kZXIvR2l0aHViL0FCQ2FsZW5kYXIvcHJvamVjdHMvYWJjYWxlbmRhci1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2FiY2FsZW5kYXItbGliLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQVc3QyxNQUFNLE9BQU8sbUJBQW1COzs7WUFQL0IsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLHNCQUFzQixFQUFFLGlCQUFpQixDQUFDO2dCQUN6RCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYmNhbGVuZGFyTGliQ29tcG9uZW50IH0gZnJvbSAnLi9hYmNhbGVuZGFyLWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHtDYWxlbmRhckNvbXBvbmVudH0gZnJvbSAnLi9jYWxlbmRhci9jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtBYmNhbGVuZGFyTGliQ29tcG9uZW50LCBDYWxlbmRhckNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW0FiY2FsZW5kYXJMaWJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFiY2FsZW5kYXJMaWJNb2R1bGUgeyB9XG4iXX0=