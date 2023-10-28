import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isSidebarExpanded!: boolean;

  constructor(private globalService: GlobalService) {
    this.globalService.isSidebarExpanded$.subscribe(
      (expanded) => (this.isSidebarExpanded = expanded)
    );
  }

  toggleSidebar() {
    this.globalService.toggleSidebar();
  }
}
