import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutUsComponent } from './features/about_us/about-us.component';
import { ContactComponent } from './features/contact/contact.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sobre', component: AboutUsComponent },
    { path: 'contato', component: ContactComponent}
  ];
