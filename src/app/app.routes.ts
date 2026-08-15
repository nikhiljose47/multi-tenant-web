import { Routes } from '@angular/router';
import { BusinessNotFoundComponent } from './pages/business-not-found/business-not-found.component';
import { TenantHomeComponent } from './pages/tenant-home/tenant-home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'adq/royal-bike-wash', pathMatch: 'full' },
  { path: ':code/:username', component: TenantHomeComponent },
  { path: '**', component: BusinessNotFoundComponent }
];
