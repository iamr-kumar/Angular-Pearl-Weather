import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  city: string;

  constructor(private router:Router, private currentRoute: ActivatedRoute){}

  onGetCity(city: NgForm){
    this.city = city.value.cityName;
    this.router.navigate(['details', this.city], {relativeTo: this.currentRoute});
  }
}
