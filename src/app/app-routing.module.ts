import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EstateListComponent } from './pages/estate-list/estate-list.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PropiertySingleComponent } from './pages/propierty-single/propierty-single.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'inmuebles',
    component: EstateListComponent
  },
  {
    path: 'nosotros',
    component: AboutUsComponent
  },
  {
    path: 'contacto',
    component: ContactComponent
  },
  {
    path: 'propiedad',
    component: PropiertySingleComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
