import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'estudio', renderMode: RenderMode.Prerender },
  { path: 'contacto', renderMode: RenderMode.Prerender },
  { path: 'reserva-cita', renderMode: RenderMode.Prerender },
  { path: 'trabajos-realizados', renderMode: RenderMode.Prerender },
  { path: 'disenos', renderMode: RenderMode.Prerender },
  { path: 'recomendaciones', renderMode: RenderMode.Prerender },
  { path: 'admin', renderMode: RenderMode.Server },
  { path: 'admin/login', renderMode: RenderMode.Server },
  { path: 'admin/dashboard', renderMode: RenderMode.Server },
  { path: 'admin/calendario', renderMode: RenderMode.Server },
  { path: 'admin/clients', renderMode: RenderMode.Server },
  { path: 'admin/artists', renderMode: RenderMode.Server },
  { path: 'admin/tattoos', renderMode: RenderMode.Server },
  { path: 'admin/estadisticas', renderMode: RenderMode.Server },
  { path: 'admin/mensajes-contacto', renderMode: RenderMode.Server },
  { path: 'admin/solicitudes-cita', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
];
