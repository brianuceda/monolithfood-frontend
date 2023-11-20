import { ISidebarData } from './helper';

export const sidebarData: ISidebarData[] = [
  {
    routerLink: 'dashboard',
    icon: 'fas fa-home',
    label: 'Panel de inicio',
  },
  {
    routerLink: 'my-profile',
    icon: 'fa-solid fa-gear',
    label: 'Cuenta',
    expanded: false,
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
    ],
  },
  {
    routerLink: 'database',
    icon: 'fa-solid fa-database',
    label: 'Base de datos',
    expanded: false,
    items: [
      {
        routerLink: 'database',
        label: 'Alimentos',
      },
      {
        routerLink: 'database/favourites',
        label: 'Favoritos',
        requiredRoles: ['ROLE_ADMIN', 'ROLE_VIP'],
      },
    ],
  },
  {
    routerLink: 'plans',
    icon: 'fa-regular fa-credit-card',
    label: 'Subscripciones',
  },
  {
    routerLink: 'reports',
    icon: 'fa-solid fa-chart-simple',
    label: 'Reportes',
    expanded: false,
    items: [
      // {
      //   routerLink: 'reports',
      //   label: 'Generales',
      // },
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
  // Datos de prueba
  // {
  //   routerLink: 'reports',
  //   icon: 'fa-solid fa-chart-simple',
  //   label: 'Reportes',
  //   expanded: true,
  //   items: [
  //     {
  //       routerLink: 'reports',
  //       label: 'Generales',
  //     },
  //     {
  //       routerLink: 'reports/fitness',
  //       label: 'Fitness',
  //     },
  //   ],
  // },
  // {
  //   routerLink: 'reports',
  //   icon: 'fa-solid fa-chart-simple',
  //   label: 'Reportes',
  //   expanded: true,
  //   items: [
  //     {
  //       routerLink: 'reports',
  //       label: 'Generales',
  //     },
  //     {
  //       routerLink: 'reports/fitness',
  //       label: 'Fitness',
  //     },
  //   ],
  // },
  // {
  //   routerLink: 'reports',
  //   icon: 'fa-solid fa-chart-simple',
  //   label: 'Reportes',
  //   expanded: true,
  //   items: [
  //     {
  //       routerLink: 'reports',
  //       label: 'Generales',
  //     },
  //     {
  //       routerLink: 'reports/fitness',
  //       label: 'Fitness',
  //     },
  //   ],
  // },
  // {
  //   routerLink: 'reports',
  //   icon: 'fa-solid fa-chart-simple',
  //   label: 'Reportes',
  //   expanded: true,
  //   items: [
  //     {
  //       routerLink: 'reports',
  //       label: 'Generales',
  //     },
  //     {
  //       routerLink: 'reports/fitness',
  //       label: 'Fitness',
  //     },
  //   ],
  // },
  // {
  //   routerLink: 'reports',
  //   icon: 'fa-solid fa-chart-simple',
  //   label: 'Reportes',
  //   expanded: true,
  //   items: [
  //     {
  //       routerLink: 'reports',
  //       label: 'Generales',
  //     },
  //     {
  //       routerLink: 'reports/fitness',
  //       label: 'Fitness',
  //     },
  //   ],
  // },
  // {
  //   routerLink: 'reports',
  //   icon: 'fa-solid fa-chart-simple',
  //   label: 'Reportes',
  //   expanded: true,
  //   items: [
  //     {
  //       routerLink: 'reports',
  //       label: 'Generales',
  //     },
  //     {
  //       routerLink: 'reports/fitness',
  //       label: 'Fitness',
  //     },
  //   ],
  // },
];
