import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  city: string;
  sideNavActive: boolean = false;
  user: User;

  constructor(private router:Router, private currentRoute: ActivatedRoute, public auth: AuthService){
      this.sideNavActive = false;
  }

  ngOnInit(){
    this.auth.user.subscribe(user => {
        this.user = user;
    })
  }

  onGetCity(city: NgForm){
    this.city = city.value.cityName;
    this.router.navigate(['details', this.city], {relativeTo: this.currentRoute});
  }

  toggleNav(){
      this.sideNavActive = !this.sideNavActive;
  }

  logout(){
      this.auth.signOut().then(() => {
        this.user = null;
        this.router.navigate(['/home']);
      })
  }


}
