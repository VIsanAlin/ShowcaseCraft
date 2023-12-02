import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AddWorkComponent } from './add-work/add-work.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  {
    path: 'add',
    component: AddWorkComponent,
    title: 'Add New Tasks',
  },
  { path: 'details/:id', component: DetailsComponent, title: 'Details' },
];
