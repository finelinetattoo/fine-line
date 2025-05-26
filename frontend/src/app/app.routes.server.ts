import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'estudio',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'contacto',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'reserva-cita',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'trabajos-realizados',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'disenos',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'recomendaciones',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
