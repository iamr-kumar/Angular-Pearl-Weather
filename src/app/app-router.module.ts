import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';

const routes = [
    {
        path: '',
        component: WeatherCardComponent,
        pathMatch: 'full'
    },
    {
        path: 'details/:id',
        component: WeatherDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouterModule{}