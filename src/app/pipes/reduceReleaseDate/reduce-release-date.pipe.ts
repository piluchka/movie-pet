import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceReleaseDate',
  standalone: true,
})
export class ReduceReleaseDatePipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    return value;
  }
}
