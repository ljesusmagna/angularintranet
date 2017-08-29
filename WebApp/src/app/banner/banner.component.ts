import { Component, OnInit } from '@angular/core';

import { ContentHubService } from '../services/ContentHub.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {

  public myInterval: number = 5000;
  public slides: any[] = [];
  public activeSlideIndex: number = 0;
  public noWrapSlides:boolean = false;
   
  constructor(private contentHubService: ContentHubService) { }

  banners = [];

  getAllBanners() {
    this.contentHubService.getTodosCategoriaHome().subscribe(data => this.MontaBanner(data), err => console.log(err));
  }

  MontaBanner(pData){
     var banns = [];
     var dados = pData.documents;

    dados.forEach(element => {
      var parseado = JSON.parse(element.document);
      this.contentHubService.preencheDetalhesBanner(parseado,banns);

      // this.bannerService.getDetalhe(id).subscribe(data => this.bannerService.preencheDetalhes(element, banns));
       this.banners = banns;
    });



  }
  ngOnInit() { this.getAllBanners();
  

  }

 
}



