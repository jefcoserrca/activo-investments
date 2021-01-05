import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './modals/login/login.component';
import { SignupComponent } from './modals/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PasswordRecoveryComponent } from './modals/password-recovery/password-recovery.component';
import { UserPropertiesComponent } from './components/user-properties/user-properties.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CreateOrEditPropertyComponent } from './pages/create-or-edit-property/create-or-edit-property.component';
import { ChangePasswordComponent } from './modals/change-password/change-password.component';
import { EditProfileComponent } from './modals/edit-profile/edit-profile.component';
import { SearcherComponent } from './modals/searcher/searcher.component';
import { NoticePrivacyComponent } from './pages/notice-privacy/notice-privacy.component';
import { EmailSenderService } from './services/email-sender.service';
import {NgxImageCompressService} from 'ngx-image-compress';
import { AgmCoreModule } from '@agm/core';
import { StepPaymentComponent } from './pages/create-or-edit-property/step-payment/step-payment.component';
import { TagInputModule } from 'ngx-chips';
import { FilterToolbarComponent } from './components/filter-toolbar/filter-toolbar.component';

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
    LoginComponent,
    SignupComponent,
    LoadingComponent,
    UserProfileComponent,
    PasswordRecoveryComponent,
    UserPropertiesComponent,
    UserInfoComponent,
    CreateOrEditPropertyComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    SearcherComponent,
    NoticePrivacyComponent,
    StepPaymentComponent,
    FilterToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    CarouselModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.maps,
      libraries: ['places']
    }),
    HttpClientModule,
    TagInputModule,
  ],
  providers: [
    EmailSenderService,
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
