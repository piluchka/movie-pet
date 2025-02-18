export interface MenuSubItems {
  label: string;
  routerLink?: string;
  icon?: string;
}

export interface MenuMainItems {
  label: string;
  items: MenuSubItems[];
}
