import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-watch-later-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './watch-later-page.component.html',
  styleUrl: './watch-later-page.component.scss',
})
export class WatchLaterPageComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}
  watchList: any[] = [];

  ngOnInit(): void {
    const movieData = JSON.parse(this.router.snapshot.queryParams['data']);
    if (movieData.length !== -1) {
      for (let i = 0; i < movieData.length; i++) {
        this.watchList.push(movieData[i]);
      }
    }
  }
  handleWatchList(movie: any) {
    const movieIndex = this.watchList.findIndex((obj) => obj === movie);
    if (movieIndex !== -1) {
      this.watchList.splice(movieIndex, 1);
    } else {
      this.watchList.push(movie);
    }
  }
}
