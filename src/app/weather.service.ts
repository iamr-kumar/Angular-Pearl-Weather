import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

    city: string;
    cities: string[] = [];

    constructor(private http: HttpClient, private router: Router) {
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

    putCities(){
        this.http.put('https://pearl-weather.firebaseio.com/cities.json', this.cities).subscribe(data => {
            console.log(data);
            this.router.navigate(['']);
        })
    }

    fetchCities(){
        return this.http.get<Array<string>>('https://pearl-weather.firebaseio.com/cities.json');
    }

    cityAdd(city: string){
        this.cities.push(city);
        this.putCities();
    }

    cityRemove(city: string){
        this.cities.splice(this.cities.indexOf(city));
        console.log(this.cities);
        this.putCities();
    }

}
