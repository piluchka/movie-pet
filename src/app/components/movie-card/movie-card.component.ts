import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormatingTimePipe } from '../../pipes/formatingTime/formating-time.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [FormatingTimePipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie: any;

  @Output() addFavorite = new EventEmitter();
  @Output() addWatchList = new EventEmitter();

  addToFavorite() {
    this.addFavorite.emit(this.movie.title);
  }
  addToWatchList() {
    this.addWatchList.emit(this.movie.title);
  }
}
