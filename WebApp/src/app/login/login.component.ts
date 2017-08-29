import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { LoginService } from './login.service';
import { LoginLDAPService } from './loginLDAP.service';

@Component({
  selector: 'my-login',
  templateUrl: './login.html',
  providers: [LoginService,LoginLDAPService]
})
export class LoginComponent {

  constructor(public router: Router ,private loginService: LoginService, private loginLDAPSvc: LoginLDAPService) {}

  login(event, username, password) {
    event.preventDefault();

     this.loginLDAPSvc.login(username, password)
                     .subscribe(
                       response => {
                         console.log(response);
                        localStorage.setItem('token', response);
                        this.router.navigateByUrl('/home');
                       },
                       error => {
                        alert(error);
                       }
                     );

    
    // this.loginService.login(username, password)
    //                  .subscribe(
    //                    response => {
    //                     localStorage.setItem('token', response.access_token);
    //                     this.router.navigateByUrl('/home');
    //                    },
    //                    error => {
    //                     alert(error);
    //                    }
    //                  );
 }
}