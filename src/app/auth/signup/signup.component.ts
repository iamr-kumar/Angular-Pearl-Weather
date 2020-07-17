import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
        // this.router.navigate(['/home']);
    }
  }

  signup(register: NgForm){
      const user: User = {
          displayName: register.value.name,
          email: register.value.email,
          cities: []
      }
      this.auth.register(user, register.value.password);
  }

}
