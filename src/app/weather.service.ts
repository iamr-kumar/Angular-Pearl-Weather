import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

    city: string;
    cityChanged: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) {}

    getWeatherByCityName(city: string): Subject<{}> {
        const weatherData = new Subject<{}>();
        this.http
        .get(
            'https://api.openweathermap.org/data/2.5/weather?units=metric&APPID=f31a5842e6d25da2c9de466f3ff67a68',
            {
            params: {
                q: city,
            }
        })
        .subscribe(
            (weather) => {
                // console.log(weather);
                weatherData.next(weather);
            },
            (err) => {
                console.log(err);
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
                tempData.next(temp['main']);
            },
            (err) => {
                console.log(err);
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
            forecast.next(data['list']);
        },
        err => {
            console.log(err);
        });
        return forecast;
    }

    onCityChange(city: string){
        this.city = city;
        this.cityChanged.next(this.city);
    }

}
