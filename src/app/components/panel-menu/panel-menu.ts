import { PagesPaths } from '../../enums/path.enum';
import { MenuMainItems } from '../../models/panel-menu.model';

export const panelMenuSettings: MenuMainItems[] = [
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
