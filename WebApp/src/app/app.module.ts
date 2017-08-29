import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }   from './app.component';
import { LoginComponent }   from './login/login.component';
import { HomeComponent }   from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AplicativosComponent } from './aplicativos/aplicativos.component';
import { NovidadesComponent } from './novidades/novidades.component';
import { ContentHubService } from './services/ContentHub.service';

import { CanActivateViaOAuthGuard } from './oAuth.canActivateGuard';

import { CarouselModule } from 'ngx-bootstrap';

// Import configured routes
import { routing } from './app.routes';

@NgModule({
  providers:    [ CanActivateViaOAuthGuard,ContentHubService ],
  imports:      [ BrowserModule , routing , HttpModule, CarouselModule],
  declarations: [ AppComponent , HomeComponent, LoginComponent, HeaderComponent, 
                  BannerComponent, DashboardComponent, AplicativosComponent,
                  NovidadesComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }