import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.scss']
})
export class PublicNavbarComponent {
  constructor(private router: Router) { }

  route(path: string): void {
    this.router.navigate([path]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  toggleMenu() {
    const menu = document.getElementById('menu');
    menu!.classList.toggle('hidden');
  }
}
