import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  cities: string[] = [];
  isLoading: boolean = false;  
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
        this.isLoading = true;
        this.weatherService.fetchCities().subscribe(cities => {
                if(cities){
                    this.cities = cities;
                }
                this.weatherService.cities = this.cities;
                this.isLoading = false;
            
            },
            err => {
                console.log(err);
            }
        );
    }

}
