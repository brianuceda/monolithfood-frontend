import { Component } from '@angular/core';
import { sidebarData } from './extra/sidebar-data';
import { fadeInOut, rotate } from './extra/sidebar.animations';
import { ISidebarData } from './extra/helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [fadeInOut, rotate],
})
export class SidebarComponent {
  collapsed: boolean = false;
  screenWidth: number = 0;
  lastCloseTime: number = 0;
  navData = sidebarData;
  multiple: boolean = false;

  constructor(private router: Router) {}

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.lastCloseTime = Date.now();
  }

  handleClick(item: ISidebarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: ISidebarData): string {
    return this.router.url.includes(data.routerLink) ? 'active' : '';
  }

  shrinkItems(item: ISidebarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  expandSidebarOnHover(): void {
    // Después de cerrar el sidebar, habrá una pequeña demora antes de que pueda volver a abrirse con el evento (mouseenter)
    if (!this.collapsed && Date.now() - this.lastCloseTime > 100) {
      this.toggleCollapse();
    }
  }
}
