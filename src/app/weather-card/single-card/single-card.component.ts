import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';

@Component({
    selector: 'app-single-card',
    templateUrl: './single-card.component.html',
    styleUrls: ['./single-card.component.css']
})
export class SingleCardComponent implements OnInit {

    @Input() city: string;
    temp: number;
    maxTemp: number;
    minTemp: number;
    feelsLike: number;
    icon: string;
    isDay: boolean;
    state: string;  

    constructor(private weatherService: WeatherService) { }

    ngOnInit(): void {
        this.getWeatherInfo(this.city);
    }

    getWeatherInfo(city: string){
        const currentDate = new Date();
        this.city = city;
        this.weatherService.getWeatherByCityName(this.city)
            .subscribe(weatherData => {
                let sunset = new Date(weatherData['sys'].sunset * 1000);
                if(sunset.getTime() < currentDate.getTime()){
                    this.isDay = false;
                }else{
                    this.isDay = true;
                }
                var icon = "wi wi-owm-";
                if(this.isDay){
                    icon = icon + 'day-';
                }
                else{
                    icon = icon + 'night-';
                }
                this.icon = icon + weatherData['weather'][0].id;
                this.state = weatherData['weather'][0].main;
                this.temp = Math.round(Number(weatherData['main']['temp']));
                this.maxTemp = Math.round(Number(weatherData['main']['temp_max']));
                this.minTemp = Math.round(Number(weatherData['main']['temp_min']));
                this.feelsLike = Math.round(Number(weatherData['main']['feels_like']));
            });

    
    }

}
