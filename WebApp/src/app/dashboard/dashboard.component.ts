import { Component, OnInit } from '@angular/core';

import { ContentHubService } from '../services/ContentHub.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {

  constructor(private contentHubService: ContentHubService) { }

  contadorMensagensIndividuais = 0;

  getMensagensIndividual(){
      this.contentHubService.getTodosCategoriaIndividual().subscribe(data => this.contadorMensagensIndividuais = data.numFound, err => console.log(err));
  }  
  
  ngOnInit() {
    this.getMensagensIndividual();
  }

}
