import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormatingTimePipe } from '../../pipes/formatingTime/formating-time.pipe';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [FormatingTimePipe, CommonModule, CardModule, ButtonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie: any;
  @Input() isFavorite = false;
  @Input() isInWatchList = false;

  @Output() addFavorite = new EventEmitter();
  @Output() addWatchList = new EventEmitter();


  addToFavorite() {
    this.isFavorite = !this.isFavorite
    this.addFavorite.emit(this.movie);
    
  }
  addToWatchList() {
    this.isInWatchList = !this.isInWatchList
    this.addWatchList.emit(this.movie);
  
  }
}
