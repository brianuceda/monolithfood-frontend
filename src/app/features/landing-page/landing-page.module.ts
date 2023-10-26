import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [HomeComponent, AboutUsComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, LandingPageRoutingModule],
})
export class LandingPageModule {}
