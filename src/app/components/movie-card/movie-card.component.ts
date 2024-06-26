import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormatingTimePipe } from '../../pipes/formatingTime/formating-time.pipe';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MathRoundPipe } from '../../pipes/mathRound/math-round.pipe';
import { ReduceStringPipe } from '../../pipes/reduceString/reduce-string.pipe';
import { RouterLink } from '@angular/router';

export class MyApplicationModule {}

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    FormatingTimePipe,
    CommonModule,
    CardModule,
    ButtonModule,
    MathRoundPipe,
    ReduceStringPipe,
    RouterLink,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  public STATIC_IMAGE_PATH = 'https://image.tmdb.org/t/p/w500/';

  @Input() movie: any;
  @Input() isFavorite = false;
  @Input() isInWatchList = false;
  @Input() isShortDescriptionNeeded = true;

  @Output() addFavorite = new EventEmitter();
  @Output() addWatchList = new EventEmitter();

  addToFavorite() {
    this.isFavorite = !this.isFavorite;
    this.addFavorite.emit(this.movie);
  }
  addToWatchList() {
    this.isInWatchList = !this.isInWatchList;
    this.addWatchList.emit(this.movie);
  }
}
