import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
    ],
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [authGuard],
        children: [
          {
            path: 'dashboard',
            redirectTo: 'clients',
            pathMatch: 'full',
          },
          {
            path: 'clients',
            loadComponent: () =>
              import('./pages/clients/clients.component').then(
                (m) => m.ClientsComponent
              ),
          },
          {
            path: 'artists',
            loadComponent: () =>
              import('./pages/artists/artists.component').then(
                (m) => m.ArtistsComponent
              ),
          },
          {
            path: 'tattoos',
            loadComponent: () =>
              import('./pages/tattoos/tattoos.component').then(
                (m) => m.TattoosComponent
              ),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
