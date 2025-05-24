import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

console.log('🟢 Entrando en main.server.ts');
const bootstrap = () => {
  console.log('🟢 Ejecutando bootstrapApplication');
  return bootstrapApplication(AppComponent, config);
};

export default bootstrap;
