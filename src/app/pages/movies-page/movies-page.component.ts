import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClearObservable } from '../../directives/clear-observable.directive';
import { takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAllMovies,
  selectNowPlayingMovies,
  selectPopularMovies,
  selectTopRatedMovies,
  selectUpcomingMovies,
} from '../../store/movie-store/selectors';
import { Movie } from '../../models/movie.model';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { LoadingCardComponent } from "../../components/loading-card/loading-card.component";

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [MovieCardComponent, LoadingCardComponent],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent extends ClearObservable implements OnInit {
  category: string = '';
  currentMovieList: Movie[] = [];

  pageTitle = '';
  loadingCardsAmount = Array(5);
  private listsNamesAndTriggers = new Map<string, any>([
    ['all-movies', selectAllMovies],
    ['upcoming', selectUpcomingMovies],
    ['now-playing', selectNowPlayingMovies],
    ['top-rated', selectTopRatedMovies],
    ['popular', selectPopularMovies],
  ]);

  private categoryTitles: { [key: string]: string } = {
    'upcoming': "Upcoming",
    'all-movies': "All Movies",
    'now-playing': 'Now playing',
    'top-rated': 'Top Rated',
    popular: 'Popular',
  };

  constructor(private route: ActivatedRoute, private store: Store) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectAllMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((allMovieList: Movie[] | null) => {
        if (allMovieList && allMovieList?.length > 0) {
          this.currentMovieList = allMovieList;
        }
      });

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.category = params.get('category') ?? '';
      this.getCurrentMovieList(this.category);
      this.getTitleForCategory(this.category);
    });
  }

  private getCurrentMovieList(category: string): void {
    let selector = this.listsNamesAndTriggers.get(category);
    if (!category) {
      selector = this.listsNamesAndTriggers.get('all-movies')
    }

    if (selector) {
      this.store
        .select(selector)
        .pipe(takeUntil(this.destroy$))
        .subscribe((movieList: any) => {
          if (movieList && movieList.length > 0) {
            this.currentMovieList = movieList;
          }
        });
    }
  }

  private getTitleForCategory(category: string): void {
    if (!category) {
      this.pageTitle = this.categoryTitles['all-movies']
      return
    }
    this.pageTitle = this.categoryTitles[category];
  }
}
