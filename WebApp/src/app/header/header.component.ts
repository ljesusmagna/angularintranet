import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  token = (localStorage.getItem("token") != null);

  constructor() { }

  ngOnInit() {

     if(localStorage.getItem("token") === null){
       this.token = false;
    }
      else
        this.token = true;
  }

}
