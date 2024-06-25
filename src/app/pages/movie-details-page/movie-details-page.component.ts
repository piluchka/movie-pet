import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  imports: [CommonModule, MovieCardComponent],
})
export class MovieDetailsPageComponent implements OnInit {
  movieData: any;
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    const incomingMovieData = this.router.snapshot.queryParams;

    this.movieData = incomingMovieData;
  }
}
