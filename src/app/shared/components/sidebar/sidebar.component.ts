import { Component } from '@angular/core';
import { SidebarData } from './sidebar-data';
import { fadeInOut, rotate } from './sidebar.animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [fadeInOut, rotate],
})
export class SidebarComponent {
  expanded: boolean = false;
  screenWidth: number = 0;
  lastCloseTime: number = 0;
  navData = SidebarData;

  toggleCollapse(): void {
    this.expanded = !this.expanded;
  }

  expandSidebarOnHover(): void {
    // Después de cerrar el sidebar, habrá una pequeña demora antes de que pueda volver a abrirse con el evento (mouseenter)
    if (!this.expanded && Date.now() - this.lastCloseTime > 100) {
      this.toggleCollapse();
    }
  }

  closeSidenav(): void {
    this.expanded = false;
    this.lastCloseTime = Date.now();
  }
}
