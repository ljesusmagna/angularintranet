import { Injectable } from '@angular/core';
import { Http, Response ,Headers, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContentHubService {
  constructor (private http: Http
  ) {}
  path = 'https://my10.digitalexperience.ibm.com';
  tenant  = '/api/e25f3073-78dc-443e-9587-b779f8605a20/delivery/v1/';
  banners = [];
  
//content types
private noticia = '858345ed-3456-4a11-b97c-9030fd19c1a6';
private bann_img = 'df64d74f-d5a2-41d0-929f-5b8d7c9e2d61';

  preencheDetalhesBanner(element, banns)
  {
    if(this.noticia == element.typeId)
    {
         var bann = element.elements;
         if(element.elements.imagemDeBanner.renditions.bannerPrincipal != null)
            bann.BannerImage = this.path + element.elements.imagemDeBanner.renditions.bannerPrincipal.url;
         else
          bann.BannerImage = this.path + element.elements.imagemDeBanner.renditions.default.url;
         bann.Descricao = '';
         bann.Titulo = element.elements.titulo.value;
         bann.Link = '/noticia/' + element.id;
        
          banns.push(bann);
    } 
    else if(this.bann_img == element.typeId)
    {
          var bann = element.elements;
         bann.BannerImage = this.path + element.elements.imagemDoBanner.url;
         bann.Descricao = element.elements.descrio.value;
         bann.Titulo = element.elements.ttulo.value;
         bann.Link = '/noticia/';
      
        banns.push(bann);
    }
  }
 
  preencheDetalhesNoticia(element, nots)
  {
      var not = element.elements;

      not.Titulo = element.name;
      if(element.elements.imagemDeBanner.renditions != null)
        {
          if(element.elements.imagemDeBanner.renditions.miniaturaDaHome != null)
            not.Miniatura = this.path + element.elements.imagemDeBanner.renditions.miniaturaDaHome.url;
        else
            not.Miniatura = this.path + element.elements.imagemDeBanner.renditions.default.url;
       } 
       else
        {
          not.Miniatura = "../../assets/img/miniatura_noviade_MAGNA.png";
        }
      var desc = element.elements.corpoDaNoticia.values[0];
      not.Descricao = desc.split('\n')[0];
      not.Link = '/noticia/' + element.id;

          
      nots.push(not);
  }


  getTodosCategoriaHome(){
    var url = this.path + this.tenant + 'search?q=*:*&wt=json&fq=categoryLeaves:(%22home%22)&fl=id,document&sort=lastModified%20desc';
    return this.http.get(url).map(res => res.json());     
  }

  getTodosCategoriaIndividual(){
  var url = this.path + this.tenant + 'search?q=*:*&wt=json&fq=classification:(content)&fq=categoryLeaves:("individual")&sort=lastModified%20desc'; 
  return this.http.get(url).map(res => res.json());     
  }

  getTodosCategoriaNoticia(){
    var url = this.path + this.tenant + 'search?q=*:*&wt=json&fq=classification:(content)&fl=id,document&fq=categoryLeaves:("not%C3%ADcia")&sort=lastModified%20asc'; 
    return this.http.get(url).map(res => res.json());     
    }
  

//   getDetalhe(id){
//   return this.http.get('https://my10.digitalexperience.ibm.com/api/e25f3073-78dc-443e-9587-b779f8605a20/delivery/v1/content/'+ id)
//      .map(res => res.json());
//  }



}

