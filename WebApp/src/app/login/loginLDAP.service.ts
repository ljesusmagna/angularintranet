
import { Injectable } from '@angular/core';
import { Http , URLSearchParams , Response ,Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class LoginLDAPService {
  
   private loginURL = "http://localhost:9000/auth";
    
  constructor(public http: Http) {}

  login(username, password) : Observable<any> {

  let params = {'email': username, 'senha' : password};

    let head: Headers = new Headers();
    head.set('Content-Type','application/json');
  
let opts:RequestOptionsArgs = { headers: head };

    return this.http.post(this.loginURL,
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