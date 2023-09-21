import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];
