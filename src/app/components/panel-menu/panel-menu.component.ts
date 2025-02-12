import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { PagesPaths } from '../../enums/path.enum';

@Component({
  selector: 'app-panel-menu',
  standalone: true,
  imports: [CommonModule, PanelMenuModule],
  templateUrl: './panel-menu.component.html',
  styleUrl: './panel-menu.component.scss',
})
export class PanelMenuComponent {
  constructor() {
    this.pagePaths = PagesPaths;
    this.items = [
      {
        label: 'Movie lists',
        items: [
          {
            label: 'All movies',
            routerLink: PagesPaths.MAIN_PAGE,
            icon: 'pi pi-circle-fill',
          },
          {
            label: 'Upcoming',
            routerLink: PagesPaths.UPCOMING_PAGE,
            icon: 'pi pi-hourglass',
          },
          {
            label: 'Now playing',
            routerLink: PagesPaths.NOW_PLAYING_PAGE,
            icon: 'pi pi-play-circle',
          },
          {
            label: 'Top Rated',
            routerLink: PagesPaths.TOP_RATED_PAGE,
            icon: 'pi pi-thumbs-up-fill',
          },
          {
            label: 'Popular',
            routerLink: PagesPaths.POPULAR_PAGE,
            icon: 'pi pi-star-fill',
          },
        ],
      },
      {
        label: 'Genres',
        items: [{ label: 'Cinema' }, { label: 'Horror' }, { label: 'Comedy' }],
      },
    ];
  }

  items: MenuItem[] = [];
  pagePaths: any;
}
