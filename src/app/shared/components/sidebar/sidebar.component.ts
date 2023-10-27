import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() sidenavRef!: MatDrawer;

  toggleSidenav() {
    this.sidenavRef.toggle();
  }
}
