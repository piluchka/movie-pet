import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mathRound',
  standalone: true,
})
export class MathRoundPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value);
  }
}
