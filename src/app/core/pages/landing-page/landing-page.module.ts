import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';

@NgModule({
  declarations: [HomeComponent, AboutUsComponent],
  imports: [CommonModule, LandingPageRoutingModule],
})
export class LandingPageModule {}
