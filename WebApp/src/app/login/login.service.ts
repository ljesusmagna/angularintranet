
import { Injectable } from '@angular/core';
import { Http , URLSearchParams , Response ,Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class LoginService {
  private OauthLoginEndPointUrl = 'https://mglwps04:10041/oauth2/endpoint/LeandroProvider/token';  // Oauth Login EndPointUrl to web API
  private clientId ='LeandroClient';
  private clientSecret ='123456';

  constructor(public http: Http) {}

  login(username, password) : Observable<any> {


//let params = {'username': username, 'password' : password, 'client_id': this.clientId, 'client_secret' : this.clientSecret, 'grant_type' : 'password' };

let params = 'grant_type=password&client_id='+ this.clientId +'&client_secret='+ this.clientSecret +'&username=' + username + '&password=' + password;

    let head: Headers = new Headers();
    head.set('Content-Type','application/x-www-form-urlencoded');
  
let opts:RequestOptionsArgs = { headers: head };

    return this.http.post(this.OauthLoginEndPointUrl,
                    params,opts
                 ).map(this.handleData)
                   .catch(this.handleError);
  }

  private handleData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  public logout() {
     localStorage.removeItem('token');
  }
}