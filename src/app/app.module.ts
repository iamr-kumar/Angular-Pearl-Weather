import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { AppRouterModule } from './app-router.module';
import { SingleCardComponent } from './weather-card/single-card/single-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
    WeatherDetailComponent,
    SingleCardComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
