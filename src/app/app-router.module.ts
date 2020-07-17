import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: WeatherCardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'details/:id',
        component: WeatherDetailComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,

    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouterModule{}