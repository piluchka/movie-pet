import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatingTime',
  standalone: true,
})
export class FormatingTimePipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const remainingMinutes = value % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
    return `${formattedHours}h ${formattedMinutes}min`;
  }
}
