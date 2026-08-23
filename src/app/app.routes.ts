import { Routes } from '@angular/router';
import { BusinessNotFoundComponent } from './pages/business-not-found/business-not-found.component';
import { TenantHomeComponent } from './pages/tenant-home/tenant-home.component';
import { TenantOffersComponent } from './pages/tenant-offers/tenant-offers.component';
import { TenantLocationComponent } from './pages/tenant-location/tenant-location.component';

export const routes: Routes = [
  { path: '', redirectTo: 'adq/royal-bike-wash', pathMatch: 'full' },
  { path: ':code/:username/offers', component: TenantOffersComponent },
  { path: ':code/:username/location', component: TenantLocationComponent },
  { path: ':code/:username', component: TenantHomeComponent },
  { path: '**', component: BusinessNotFoundComponent }
];
