import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { FaqComponent } from './features/my-application/feat-general/components/faq/faq.component';
import { ErrorComponent } from './features/my-application/feat-general/components/error/error.component';
import { FeatGeneralModule } from './features/my-application/feat-general/feat-general.module';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { PlansComponent } from './features/my-application/feat-plans/components/plans/plans.component';

@NgModule({
  declarations: [AppComponent, FaqComponent, ErrorComponent, PlansComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedComponentsModule,
    FeatGeneralModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
