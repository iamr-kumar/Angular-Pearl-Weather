import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

    city: string;
    cities: string[] = [];
    errorMessage: string;

    constructor(private http: HttpClient, private router: Router, private fb: AuthService) {
        
    }

    getWeatherByCityName(city: string): Subject<{}> {
        const weatherData = new Subject<{}>();
        this.http
        .get(
            'https://api.openweathermap.org/data/2.5/weather?units=metric&APPID=f31a5842e6d25da2c9de466f3ff67a68',
            {
            params: {
                q: city,
            }
        }).pipe(first())
        .subscribe(
            (weather) => {
                // console.log(weather);
                this.errorMessage = "";
                weatherData.next(weather);
            },
            (err) => {
                if(err.error.message === "city not found"){
                    this.errorMessage = "City not found!";
                }else{
                    this.errorMessage = "Some error occured, please try again!";
                }
            }
        );

        return weatherData;
    }

    getTempInfo(city: string): Subject<string> {
        const tempData = new Subject<string>();
        this.http
        .get(
            'https://api.openweathermap.org/data/2.5/weather?units=metric&APPID=f31a5842e6d25da2c9de466f3ff67a68',
            {
            params: {
                q: city,
            },
            }
        )
        .subscribe(
            (temp) => {
                // console.log(temp['main']);
                this.errorMessage = "";
                tempData.next(temp['main']);
            },
            (err) => {
                if(err.error.message === "city not found"){
                    this.errorMessage = "City not found!";
                }else{
                    this.errorMessage = "Some error occured, please try again!";
                }
            }
        );

        return tempData;
    }

    getForecastWeather(city: string): Subject<Array<any>>{
        const forecast = new Subject<Array<any>>();
        this.http.get(
            'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=f31a5842e6d25da2c9de466f3ff67a68',
            {
                params: {
                    'q': city
                }
            }
        )
        .subscribe(data => {
            // console.log(data);
            this.errorMessage = "";
            forecast.next(data['list']);
        },
        err => {
            if(err.error.message === "city not found"){
                this.errorMessage = "City not found!";
            }else{
                this.errorMessage = "Some error occured, please try again!";
            }
        });
        return forecast;
    }

    addCity(city: string){
        this.cities.push(city);
        this.fb.updateCity(this.cities);
        this.router.navigate(['/home']);
    }

    removeCity(city: string){
        var index = this.cities.indexOf(city);
        this.cities.splice(index, 1);
        this.fb.updateCity(this.cities);
        this.router.navigate(['/home']);
    }

    



}
