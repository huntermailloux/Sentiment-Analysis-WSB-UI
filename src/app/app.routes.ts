import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnaylsisComponent } from './anaylsis/anaylsis.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: ':ticker',
        component: AnaylsisComponent
      },
    { 
        path: '**',
        redirectTo: ''
    }
];
