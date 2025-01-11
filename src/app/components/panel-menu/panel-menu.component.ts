import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-panel-menu',
  standalone: true,
  imports: [CommonModule, PanelMenuModule],
  templateUrl: './panel-menu.component.html',
  styleUrl: './panel-menu.component.scss',
})
export class PanelMenuComponent {
  constructor() {
    this.items = [
      {
        label: 'Movie lists',
        items: [
          { label: 'All movies', routerLink: '/', icon: 'pi pi-circle-fill' },
          {
            label: 'Upcoming',
            routerLink: 'upcoming',
            icon: 'pi pi-hourglass',
          },
          {
            label: 'Now playing',
            routerLink: 'now-playing',
            icon: 'pi pi-play-circle',
          },
          {
            label: 'Top Rated',
            routerLink: 'top-rated',
            icon: 'pi pi-thumbs-up-fill',
          },
          { label: 'Popular', routerLink: 'popular', icon: 'pi pi-star-fill' },
        ],
      },
      {
        label: 'Genres',
        items: [{ label: 'Cinema' }, { label: 'Horror' }, { label: 'Comedy' }],
      },
    ];
  }

  items: MenuItem[] = [];
}
