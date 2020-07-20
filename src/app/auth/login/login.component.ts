import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { WeatherService } from 'src/app/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private weatherService: WeatherService,
    private router: Router) { }

  ngOnInit(): void {
      if(this.auth.isLoggedIn()){
          this.router.navigate(['/home']);
      }
  }

  onLogin(login: NgForm){
      this.auth.login(login.value.email, login.value.password).then(
          res => {
            this.router.navigate(['/home']);
          }, err => {
              this.auth.errorMessage = "Invalid email or password!";
              setTimeout(() => {
                this.auth.errorMessage = "";
            }, 3000);
          }
      ).catch(err => {
          console.log(err);
      })
  }

}
