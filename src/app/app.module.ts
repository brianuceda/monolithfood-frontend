import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from 'src/app/app.component';
// Components
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { PrincipalModule } from './shared/modules/principal.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // Components
    SharedComponentsModule,
    // Imports
    PrincipalModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
