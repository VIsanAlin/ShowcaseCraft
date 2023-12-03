import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AddWorkComponent } from './add-work/add-work.component';
import { ModifyTaskComponent } from './modify-task/modify-task.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  {
    path: 'add',
    component: AddWorkComponent,
    title: 'Add New Tasks',
  },
  { path: 'modify/:id', component: ModifyTaskComponent, title: 'Modify Task' },
  { path: 'details/:id', component: DetailsComponent, title: 'Details' },
];
