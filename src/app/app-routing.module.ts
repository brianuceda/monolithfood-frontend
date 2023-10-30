import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

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
    pathMatch: 'full',
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./features/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  // General routes
  {
    path: 'server',
    loadChildren: () =>
      import('./features/my-application/feat-general/feat-general.module').then(
        (m) => m.FeatGeneralModule
      ),
  },
  // Application routes
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        './features/my-application/feat-dashboard/feat-dashboard.module'
      ).then((m) => m.FeatDashboardModule),
  },
  {
    path: 'my-profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        './features/my-application/feat-my-profile/feat-my-profile.module'
      ).then((m) => m.FeatMyProfileModule),
  },
  {
    path: 'database',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        './features/my-application/feat-database/feat-database.module'
      ).then((m) => m.FeatDatabaseModule),
  },
  {
    path: 'plans',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/my-application/feat-plans/feat-plans.module').then(
        (m) => m.FeatPlansModule
      ),
  },
  {
    path: 'reports',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/my-application/feat-reports/feat-reports.module').then(
        (m) => m.FeatReportsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'server/error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
