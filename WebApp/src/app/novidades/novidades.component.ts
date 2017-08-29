import { Component, OnInit } from '@angular/core';

import { ContentHubService } from '../services/ContentHub.service';


@Component({
  selector: 'app-novidades',
  templateUrl: './novidades.component.html',
  styleUrls: ['./novidades.component.css'],
})
export class NovidadesComponent implements OnInit {

  public myInterval: number = 5000;
  public slides: any[] = [];
  public activeSlideIndex: number = 0;
  public noWrapSlides:boolean = false;
   
  constructor(private contentHubService: ContentHubService) { }

  noticias = [];

  getAllNovidades() {
    this.contentHubService.getTodosCategoriaNoticia().subscribe(data => this.MontaBox(data), err => console.log(err));
  }

  MontaBox(pData){
     var notics = [];
     var dados = pData.documents;

    dados.forEach(element => {
      var parseado = JSON.parse(element.document);
      this.contentHubService.preencheDetalhesNoticia(parseado,notics);

      // this.bannerService.getDetalhe(id).subscribe(data => this.bannerService.preencheDetalhes(element, banns));
       this.noticias = notics;
    });



  }
  ngOnInit() { this.getAllNovidades();
  

  }

 
}



