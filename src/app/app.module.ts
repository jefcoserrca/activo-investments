import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CardPropertyComponent } from './components/card-property/card-property.component';
import { FooterComponent } from './components/footer/footer.component';
import { SquareCardComponent } from './components/square-card/square-card.component';
import { EstateListComponent } from './pages/estate-list/estate-list.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PropiertySingleComponent } from './pages/propierty-single/propierty-single.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    CardPropertyComponent,
    FooterComponent,
    SquareCardComponent,
    EstateListComponent,
    AboutUsComponent,
    ContactComponent,
    PropiertySingleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
