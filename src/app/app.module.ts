import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AbcalendarLibModule} from '../../projects/abcalendar-lib/src/lib/abcalendar-lib.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AbcalendarLibModule
    ],
  providers: [{provide: APP_INITIALIZER, useFactory: i18nFactory, deps: [TranslateService], multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function i18nFactory(translate: TranslateService): () => Promise<void> {
  const lang = localStorage.getItem('lang');
  if (lang === null){
    localStorage.setItem('lang', 'en');
  }
  translate.addLangs(['en', 'de']);
  translate.setDefaultLang(lang);
  return () => {
    return new Promise<void>((resolve) => {
      translate.use(translate.getDefaultLang()).subscribe(() => {
        resolve();
      });
    });
  };
}
