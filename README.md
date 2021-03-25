# IMPORTANT!!!

**I'm just a apprentice in Software Development and this is my first dependency. Sometimes it doesn't work but I update continiusly**
<br/>
If you need it right now, download repo from git and copy code ;)

# ABCalendar

**CURRENTLY ONLY ALL DAY & SINGLE DAY EVENTS SUPPORTED**

The ABCalender was programmed, because there is still no usable calendar with year view, which is easy to use and therefore ideal for beginners.
Configurable values:
- View selection
- Initial view
- Start date
- Object with Locale Values
- Event input
- Event output (on Click)

## Implementation
* run "npm i abcalendar" in Terminal
* go to html and write **<lib-abcalendar-lib></lib-abcalendar-lib>**
* setup calendar like in [the example](#example)


## Input types

[views]: 
* string[]
* Choice:   'year','month','week','day'
* default: ['year','month','week','day']
  
[initialView]:
* string
* Choice: 'year','month','week','day'
* default: 'month'

[initialDate]:
* Date
* default: Date.now()

[localeValue]:
* Local
* Local-Pattern: [Locale](#locale)
* default: English

[event]:
* Item[]: (id, title, color, list, dateOfExpiry)
* Optional: list, color


## Output Types

(eventClick):
* Item

## Object Examples

<a name="locale"></a>
##### Locale:
```
export class Locale {
weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
others = ["Year", "Week", "Month", "Day", "Today", "All Day"];
}
```
<a name="item"></a>
##### Item:
```
export class Item {
  itemId = 1;
  list = List;
  * title = "A Title";
  color = "#0e0e0e";
  * dateOfExpiry = new Date(Date.now());
}
```

<a name="list"></a>
##### List:
```
export class List {
  listId = 1;
  item = Item[];
  title = "A List Title";
  dateOfExpiry = new Date(Date.now());
}
```
  
-> [*Recommended Values]

<a name="example"></a>
## Implementation Example
```
 <lib-abcalendar-lib
      [initialDate]="getInitialDate()"
      [initialView]="'month'"
      [views]="['year', 'month', 'week', 'day']"
      [events]="getEvents()"
      [localeValue]="createLocalValue()"
      (eventClick)="setItem($event)"
    >
 </lib-abcalendar-lib>
```
 
 #### How to use $event?
 Just give $event to Method in header an take the Values you need <br/>
 
 **Example:** <br/>
 ```
  setItem($event: Item): void {
     console.log($event.title);
   }
```

## Pictures

This is an example for the YearView with some Events:
![year view](./src/assets/expampleImages/yearview.jpg)

This is an example for the MonthView with some Events:
![year view](./src/assets/expampleImages/monthview.jpg)

This is an example for the WeekView with some Events:
![year view](./src/assets/expampleImages/weekview.jpg)

This is an example for the DayView with some Events:
![year view](./src/assets/expampleImages/dayview.jpg)
"ABCalendar" 
"# ABCalendar" 
"# ABCalendar" 
