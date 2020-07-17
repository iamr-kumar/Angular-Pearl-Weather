import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  isLoading: boolean = false;  
  sub: Subscription;

  constructor(public weatherService: WeatherService, private fb: AuthService) { }

  ngOnInit(): void {
        this.isLoading = true;
        this.sub = this.fb.user.subscribe(userData => {
            this.weatherService.cities = userData.cities;
        }, err => {
            console.log(err);
        });
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
    }

}
