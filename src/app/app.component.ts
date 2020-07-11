import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { WeatherService } from './weather.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('city', {static: false}) cityName: ElementRef;
  @Output() cityChanged = new EventEmitter<string>();
  city: string;

  constructor(private weatherService: WeatherService, private router:Router, private currentRoute: ActivatedRoute){}

  onGetCity(){
    this.city = this.cityName.nativeElement.value;
    this.router.navigate(['details', this.city], {relativeTo: this.currentRoute});
  }
}
