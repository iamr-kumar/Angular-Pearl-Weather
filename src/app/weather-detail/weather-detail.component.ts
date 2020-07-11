import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {

    city: string = 'Ranchi';
    temp: number;
    maxTemp: number;
    minTemp: number;
    feelsLike: number;
    state: string;
    humidity: number;
    wind: number;
    date: string;
    time: string;
    isDay: boolean;
    sunsetTime: string;
    
    today: string;

    forecastWeather: {
        day: string,
        temp: number,
        state: string,
        icon: string
    }[] = [];


    constructor(private weatherService: WeatherService) { }

    ngOnInit(): void {
        this.weatherService.cityChanged.subscribe(city => {
            this.city = city;
            this.forecastWeather = [];
            this.getWeatherInfo(this.city);
        });
        this.getWeatherInfo(this.city);

    }

    getWeatherInfo(city: string){
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
                        'September', 'October', 'November', 'December'];
        const currentDate = new Date();
        const todayInNumber = currentDate.getDay();
        this.today = days[todayInNumber];
        this.time = currentDate.getHours() + ":" + currentDate.getMinutes();
        this.city = city;
        this.date = months[currentDate.getMonth()] + ' ' + currentDate.getDate();
        this.weatherService.getWeatherByCityName(this.city).subscribe(weatherData => {
            this.state = weatherData['weather'][0].main;
            let sunset = new Date(weatherData['sys'].sunset * 1000);
            this.sunsetTime = sunset.getHours() + ':' + sunset.getMinutes();
            console.log(this.sunsetTime)
            if(sunset.getTime() < currentDate.getTime()){
                this.isDay = false;
            }else{
                this.isDay = true;
            }
            console.log(this.isDay);
            this.temp = Math.round(Number(weatherData['main']['temp']));
            this.maxTemp = Math.round(Number(weatherData['main']['temp_max']));
            this.minTemp = Math.round(Number(weatherData['main']['temp_min']));
            this.feelsLike = Math.round(Number(weatherData['main']['feels_like']));
            this.humidity = Number(weatherData['main']['humidity']);
            this.wind = weatherData['wind'].speed;
        });

        this.weatherService.getForecastWeather(this.city).subscribe(forecast => {
            var previousDay = '';
            var prefix = "wi wi-owm-";
            for(var i = 0; i < forecast.length; i++){
                const day = new Date(forecast[i].dt_txt).getDay();
                var currentDay = days[day];
                if(currentDay !== previousDay){
                    var temp = Math.round(Number(forecast[i]['main']['temp']));
                    var state = forecast[i]['weather'][0]['main'];
                    const code = forecast[i].weather[0].id;
                    var icon = '';
                    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                        icon = 'day-' + code;
                    }
                    icon = prefix + icon;
                    this.forecastWeather.push({
                        day: currentDay,
                        temp: temp,
                        state: state,
                        icon: icon
                    });
                    previousDay = currentDay;
                }
            }
        });
    }

}