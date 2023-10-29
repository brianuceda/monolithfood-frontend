export const SidebarData = [
  {
    routerLink: 'dashboard',
    icon: 'fas fa-home',
    label: 'Panel de inicio',
  },
  {
    routerLink: 'my-profile',
    icon: 'fa-solid fa-gear',
    label: 'Cuenta',
    items: [
      {
        routerLink: 'my-profile',
        label: 'Mi perfil',
      },
      {
        routerLink: 'my-profile/objectives',
        label: 'Objetivos',
      },
      {
        routerLink: 'my-profile/activity-levels',
        label: 'Actividad física',
      },
      {
        routerLink: 'my-profile/subscriptions',
        label: 'Suscripciones',
      },
    ],
  },
  {
    routerLink: 'database',
    icon: 'fa-solid fa-database',
    label: 'Base de datos',
    items: [
      {
        routerLink: 'database',
        label: 'Alimentos',
      },
      {
        routerLink: 'database/favourites',
        label: 'Favoritos',
      },
    ],
  },
  {
    routerLink: 'reports',
    icon: 'fa-solid fa-chart-simple',
    label: 'Reportes',
    items: [
      {
        routerLink: 'reports',
        label: 'Generales',
      },
      {
        routerLink: 'reports/fitness',
        label: 'Fitness',
      },
    ],
  },
  {
    routerLink: 'server/faq',
    icon: 'fa-solid fa-circle-question',
    label: 'F.A.Q.',
  },
];
