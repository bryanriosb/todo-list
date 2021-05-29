import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';



const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module')
        .then( m => m.DashboardModule),
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module')
        .then( m => m.ProjectsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module')
        .then( m => m.UsersModule),
      },
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
