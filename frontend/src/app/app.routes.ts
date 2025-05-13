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
      {
        path: 'contacto',
        loadComponent: () =>
          import('./features/contact/contact-page/contact-page.component').then(
            (m) => m.ContactPageComponent
          ),
      },
      {
        path: 'reserva',
        loadComponent: () =>
          import(
            './features/appointment/appointment-page/appointment-page.component'
          ).then((m) => m.AppointmentPageComponent),
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
                './features/calendar/calendar-page/calendar-page.component'
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
            path: 'estadisticas',
            loadComponent: () =>
              import(
                './features/charts/charts-page/charts-page.component'
              ).then((m) => m.ChartsPageComponent),
          },
          {
            path: 'mensajes-contacto',
            loadComponent: () =>
              import(
                './features/messages-contact/messages-contact-page/messages-contact-page.component'
              ).then((m) => m.MessagesContactPageComponent),
          },
          {
            path: 'solicitudes-cita',
            loadComponent: () =>
              import(
                './features/appointment-requests/appointment-requests-page/appointment-requests-page.component'
              ).then((m) => m.AppointmentRequestsPageComponent),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/not-found/not-found-page/not-found-page.component'
          ).then((m) => m.NotFoundPageComponent),
      },
    ],
  },
];
