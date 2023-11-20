import { ISidebarData } from '../extra/helper';
import { Component, Input, OnInit } from '@angular/core';
import { fadeInOut, slideInOut } from '../extra/sidebar.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sublevel-menu',
  templateUrl: './sublevel-menu.component.html',
  styleUrls: ['../sidebar.component.scss'],
  animations: [slideInOut, fadeInOut],
})
export class SublevelMenuComponent implements OnInit {
  @Input() data: ISidebarData = {
    routerLink: '',
    icon: '',
    label: '',
    items: [],
  };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: ISidebarData): string {
    return item.expanded && this.router.url.includes(item.routerLink)
      ? 'active-sublevel'
      : '';
  }
}
