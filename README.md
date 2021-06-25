# ABCalendar

## Note & Description
**SUPPORTS BOOTSTRAP 5**

The ABCalender was programmed, because there is still no usable calendar with year view, which is easy to use and therefore ideal for beginners.
Configurable values:
- View selection
- Initial view
- Start date
- Language or Object with LocalValue
- Event input
- Event output (on Click)
- Date output (on Click)

## Setup a program with ABCalendar

##### 1. Generate Program
- Write in *cmd*: ng new *program-name*
- Add routing if you want and choose scss as Style 

##### 2. Install Bootstrap
- **Bootstrap:**
   * If you use Bootstrap 4.6.0 or lower, you maybe need to install jQuery, too
   * Run *npm i bootstrap* in your terminal
   * Add the following to your **angular.json**-file:
    ```
    "styles": [
               "node_modules/bootstrap/dist/css/bootstrap.min.css",
               "src/styles.scss"
              ],
    "scripts": [
               "node_modules/bootstrap/dist/js/bootstrap.js"
               ]
    ```
  <span style="color: RED">**WARNING:** YOU NEED TO ADD THIS CODE TWICE IN THE ANGULAR.JSON-FILE<span/> 
  
##### 3. Install ABCalendar
- Run *npm i abcalendar* in your terminal
- Add AbcalendarLibModule to your app.module.ts
    * example:
        ```
      import { BrowserModule } from '@angular/platform-browser';
      import { NgModule } from '@angular/core';
      
      import { AppRoutingModule } from './app-routing.module';
      import { AppComponent } from './app.component';
      import {AbcalendarLibModule} from 'abcalendar';
      
      @NgModule({
        declarations: [
          AppComponent
        ],
          imports: [
              BrowserModule,
              AppRoutingModule,
              AbcalendarLibModule
          ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
        ```
      
##### 4. Setup ABCalendar
- Smallest required text in component.html:
    ```
  <lib-abcalendar-lib>
  </lib-abcalendar-lib>
    ```
- config examples for Input-Values:
    * **config for [views]:**
        * in .html:
        ```
      [views] = "['year','month','week','day']"
        ```
    * **config for [initialView]:**
        * in .html:
      ```
      [initialView]="'month'"
      ```
    * **config for [initialDate]:**
        * in .html:
        ```
        [initialDate] = "setInitialDate()"
        ```
        * in .ts:
        ```
        setInitialDate(): Date {
            return new Date(Date.now());
        }
        ```
    * **config for language**
        * **config for [language]:**
            * in .html:
            ```
            [language] = "'en-Us'"
            ```
            *If your required language is not among the following, please refer to the paragraph *config for [localeValue]* to implement your own language.
             <br/>
             'en-..','de-..','ru-..','zh-..','es-..','it-..','fr-..', 'ar-..'
             <br/>
             PLEASE NOTE: Here the exact pattern must be followed!*
        * **config for [localeValue]:**
            * in .html:
            ```
            [localeValue] = "setLocaleValue()"
            ```
            * in .ts:
            ```
            import {Local} from 'abcalendar';
            .
            .
            .
            setLocaleValue(): Local {
                return {
                  weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                  others: ['Year', 'Week', 'Month', 'Day', 'Today', 'All Day']
                        };
            }
            ```
    * **config for [events]:**
        * in .html:
        ```
        [events] = "getEvents()"
        ```
        
        * in .ts with own Input:
        ```
        import {Item} from 'abcalendar';
        .
        .
        .
        getEvents(): Item {
        const date = new Date(Date.now());
        return [{itemId: 1, title: 'aTitle', dateOfExpiry: date, color: '#000'}];
        }
        ```
        * in .ts with language Input:
        ```
        return {lang: 'en-US'};
        ```
        -> string must be in locale-Format (example: en-US, de-De)
        
    * **usage of (eventEmitter):**
        * in .html:
        ```
        (eventEmitter) = "setItem($event)"
        ```
        * in .ts:
        ```
        setItem($event): void {
            console.log($event.title);
            console.log($event.itemId);
            this.router.navigateByUrl(`randomPageUrl/${$event.itemId}`);
        }
        ```
    * **usage of (dayEmitter):**
            * in .html:
            ```
            (dayEmitter) = "getDate($event)"
            ```
            * in .ts:
            ```
            getDate($event): void {
                console.log($event.getFullYear());
            }
            ```
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

[language]:
* string
* default: en-Us

[localeValue]:
* Local
* Local-Pattern: [Locale](#locale)
* default: English

[event]:
* Item[]: (id, title, color, list, dateOfExpiry)
* Optional: list, color

## Output Types

(eventEmitter):
* Item

(eventChange):
* Item

(dateEmitter):
* Date

## Object Examples

<a name="locale"></a>
##### Locale:
```
export class Locale {
weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
others = ["Year", "Month", "Week", "Day", "Today", "All Day"];
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
  * startDate = new Date(Date.now());
  endDate = new Date (Date.now());
  allDayItem = false;
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
  
*Recommended Values
