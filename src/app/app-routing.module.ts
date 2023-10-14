import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Landing page routes
  {
    path: '',
    loadChildren: () =>
      import('./features/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./features/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  // Application routes
  {
    path: 'my-profile',
    loadChildren: () =>
      import('./features/my-application/feat-my-profile/feat-my-profile.module').then(
        (m) => m.FeatMyProfileModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/my-application/feat-dashboard/feat-dashboard.module').then(
        (m) => m.FeatDashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
