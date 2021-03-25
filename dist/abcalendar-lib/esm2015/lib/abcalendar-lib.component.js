import { Component, EventEmitter, Input, Output } from '@angular/core';
export class AbcalendarLibComponent {
    constructor() {
        this.eventEmitter = new EventEmitter();
    }
    ngOnInit() {
    }
    setEvent($event) {
        this.eventEmitter.emit($event);
    }
}
AbcalendarLibComponent.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
AbcalendarLibComponent.ctorParameters = () => [];
AbcalendarLibComponent.propDecorators = {
    initialView: [{ type: Input }],
    initialDate: [{ type: Input }],
    events: [{ type: Input }],
    views: [{ type: Input }],
    localeValue: [{ type: Input }],
    eventEmitter: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJjYWxlbmRhci1saWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL25pY2xhcy5sYW5nL0Rlc2t0b3AvS2FsZW5kZXIvR2l0aHViL0FCQ2FsZW5kYXIvcHJvamVjdHMvYWJjYWxlbmRhci1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2FiY2FsZW5kYXItbGliLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBaUI3RSxNQUFNLE9BQU8sc0JBQXNCO0lBRWpDO1FBZUEsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBZHhDLENBQUM7SUFnQkQsUUFBUTtJQUNSLENBQUM7SUFFRCxRQUFRLENBQUMsTUFBWTtRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7WUF0Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7YUFFRjs7OzswQkFNRSxLQUFLOzBCQUVMLEtBQUs7cUJBRUwsS0FBSztvQkFFTCxLQUFLOzBCQUVMLEtBQUs7MkJBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0l0ZW0sIExvY2FsfSBmcm9tICcuL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1hYmNhbGVuZGFyLWxpYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxpYi1jYWxlbmRhclxuICAgICAgW3ZpZXdzXT1cInZpZXdzXCJcbiAgICAgIFtpbml0aWFsVmlld109XCJpbml0aWFsVmlld1wiXG4gICAgICBbaW5pdGlhbERhdGVdPVwiaW5pdGlhbERhdGVcIlxuICAgICAgW2V2ZW50c109XCJldmVudHNcIlxuICAgICAgKGV2ZW50Q2xpY2spPVwic2V0RXZlbnQoJGV2ZW50KVwiXG4gICAgICBbbG9jYWxlVmFsdWVdPVwibG9jYWxlVmFsdWVcIlxuICAgID48L2xpYi1jYWxlbmRhcj5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBYmNhbGVuZGFyTGliQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGluaXRpYWxWaWV3OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGluaXRpYWxEYXRlOiBEYXRlO1xuICBASW5wdXQoKVxuICBldmVudHM6IEl0ZW1bXTtcbiAgQElucHV0KClcbiAgdmlld3M6IHN0cmluZ1tdO1xuICBASW5wdXQoKVxuICBsb2NhbGVWYWx1ZTogTG9jYWw7XG5cbiAgQE91dHB1dCgpXG4gIGV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXI8SXRlbT4oKTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG4gIHNldEV2ZW50KCRldmVudDogSXRlbSk6IHZvaWQge1xuICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJGV2ZW50KTtcbiAgfVxufVxuIl19