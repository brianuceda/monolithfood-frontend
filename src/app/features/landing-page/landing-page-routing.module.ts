import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PublicAuthGuard } from 'src/app/core/guards/public-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', canActivate: [PublicAuthGuard], component: LoginComponent },
  {
    path: 'register',
    canActivate: [PublicAuthGuard],
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
