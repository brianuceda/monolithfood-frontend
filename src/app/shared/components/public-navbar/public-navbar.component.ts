import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.scss'],
})
export class PublicNavbarComponent implements OnDestroy {
  constructor(private router: Router) {
    window.addEventListener('scroll', this.onScroll, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll, true);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const navbarButtons = document.getElementById('navbar');
    if (
      window.scrollY > 0 &&
      navbarButtons!.classList.contains('responsive-on') &&
      navbarButtons!.classList.contains('in-auth-page')
    ) {
      this.toggleMenu();
    }
  }

  route(path: string): void {
    this.toggleMenu();
    this.router.navigate([path]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  toggleMenu() {
    const navbarButtons = document.getElementById('navbar');
    navbarButtons!.classList.toggle('responsive-on');
  }

  isInAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
