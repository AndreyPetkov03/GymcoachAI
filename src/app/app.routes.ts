import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Success } from './pages/success/success';
import { Cancel } from './pages/cancel/cancel';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'success', component: Success },
  { path: 'cancel', component: Cancel },
  { path: '**', redirectTo: '' }
];
