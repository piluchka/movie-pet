import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { GenresPaths } from '../../enums/path.enum';
import { basePanelMenuSettings } from './panel-menu';
import { Store } from '@ngrx/store';
import { selectMovieGenres } from '../../store/movie-store/selectors';
import { ClearObservable } from '../../directives/clear-observable.directive';
import { takeUntil } from 'rxjs';
import { MovieGenre } from '../../models/movie-genres.model';

@Component({
  selector: 'app-panel-menu',
  standalone: true,
  imports: [CommonModule, PanelMenuModule],
  templateUrl: './panel-menu.component.html',
  styleUrl: './panel-menu.component.scss',
})
export class PanelMenuComponent extends ClearObservable implements OnInit {
  constructor(private store: Store) {
    super();
  }

  baseMenuSettings: MenuItem[] = [...basePanelMenuSettings];

  ngOnInit(): void {
    this.store
      .select(selectMovieGenres)
      .pipe(takeUntil(this.destroy$))
      .subscribe((genres: MovieGenre[] | null) => {
        const genresForSettings = genres?.map((genre) => {
          const genreKey = (genre.name.toUpperCase().replace(/\s+/g, '_') +
            '_PATH') as keyof typeof GenresPaths;
          return {
            label: genre.name,
            routerLink: GenresPaths[genreKey],
          };
        });
        const genresInSettings = basePanelMenuSettings.find(
          (item) => item.label.toLowerCase() === 'genres'
        );
        if (genresInSettings && genresForSettings) {
          genresInSettings.items = genresForSettings;
        }
      });
  }
}
