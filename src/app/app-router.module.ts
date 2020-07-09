import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';

const routes = [
    {
        path: '',
        component: AppComponent,
        pathMatch: 'full'
    },
    {
        path: 'details',
        component: WeatherDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouterModule{}