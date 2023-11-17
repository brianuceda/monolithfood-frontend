export interface ISidebarData {
  routerLink: string;
  icon?: string;
  label: string;
  expanded?: boolean;
  items?: ISidebarData[];
  requiredRoles?: string[];
}
