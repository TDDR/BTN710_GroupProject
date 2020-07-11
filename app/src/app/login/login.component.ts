import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataManagerService } from '../observables/data-manager.service';
import { User} from '../observables/data-classes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private manager: DataManagerService,
              private router: Router) {}

  loginData = new User();
  fromDB;

  ngOnInit() {
  }

  login(): void {

    this.manager.loginUser(this.loginData)
      .subscribe(data => {
        localStorage.setItem('token', data['token'])
        this.router.navigate(["/home"]);
      });
  }

}
