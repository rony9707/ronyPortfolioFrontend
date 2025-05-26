import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { userResolver } from './shared/routeGuard/agnibhaData.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { user: userResolver }
  },
];
