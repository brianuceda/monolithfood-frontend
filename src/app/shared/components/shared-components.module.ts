import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Landing Page
import { PublicNavbarComponent } from './public-navbar/public-navbar.component';
// Application Page
import { PrivateNavbarComponent } from './private-navbar/private-navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SublevelMenuComponent } from './sidebar/sublevel-menu/sublevel-menu.component';
// Components
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ButtonComponent,
    PublicNavbarComponent,
    PrivateNavbarComponent,
    SidebarComponent,
    SublevelMenuComponent,
  ],
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  exports: [
    ButtonComponent,
    PublicNavbarComponent,
    PrivateNavbarComponent,
    SidebarComponent,
    SublevelMenuComponent,
  ],
})
export class SharedComponentsModule {}
