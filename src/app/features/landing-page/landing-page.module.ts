import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { OauthCallbackComponent } from './components/oauth-callback/oauth-callback.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutUsComponent,
    LoginComponent,
    RegisterComponent,
    OauthCallbackComponent,
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    AngularMaterialModule,
    SharedComponentsModule,
  ],
})
export class LandingPageModule {}
