import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  cities: string[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.fetchCities().subscribe(cities => {
        this.cities = cities;
        this.weatherService.cities = cities;
        console.log(this.weatherService.cities);
    });
  }

}
