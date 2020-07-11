import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  
import { DataManagerService } from '../observables/data-manager.service';
import { User, addUser } from '../observables/data-classes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
    constructor(private manager: DataManagerService,
                private router: Router) { }
  
    user =  new addUser("","","","","","member", new Date());
    newUser = new User();  
  
    ngOnInit(): void {
    }
        // Form submit button handler
        addUser(): void {

          // Send request
          this.manager.addUser(this.user)
            .subscribe(data => {              
              localStorage.setItem('token', data['token'])
              this.router.navigate(["/home"]);
            });
        }
  }
  
