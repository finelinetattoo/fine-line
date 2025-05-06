import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home-page/home-page.component').then(
            (m) => m.HomePageComponent
          ),
      },
      {
        path: 'estudio',
        loadComponent: () =>
          import('./features/studio/studio-page/studio-page.component').then(
            (m) => m.StudioPageComponent
          ),
      },
    ],
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./core/auth/login/login-page/login.component').then(
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
          import('./core/auth/login/login-page/login.component').then(
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
            redirectTo: 'calendario',
            pathMatch: 'full',
          },
          {
            path: 'calendario',
            loadComponent: () =>
              import(
                './features/calendar/calendar-page/calendar.component'
              ).then((m) => m.CalendarPageComponent),
          },
          {
            path: 'clients',
            loadComponent: () =>
              import(
                './features/clients/clients-page/clients-page.component'
              ).then((m) => m.ClientsPageComponent),
          },
          {
            path: 'artists',
            loadComponent: () =>
              import(
                './features/artists/artists-page/artists-page.component'
              ).then((m) => m.ArtistsPageComponent),
          },
          {
            path: 'tattoos',
            loadComponent: () =>
              import(
                './features/tattoos/tattoos-page/tattoos-page.component'
              ).then((m) => m.TattoosPageComponent),
          },
          {
            path: 'graficos',
            loadComponent: () =>
              import(
                './features/charts/charts-page/charts-page.component'
              ).then((m) => m.ChartsPageComponent),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
