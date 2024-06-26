import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceString',
  standalone: true,
})
export class ReduceStringPipe implements PipeTransform {
  transform(value: string, stringLenth = 100): string {
    if (value.length > stringLenth) {
      value = value.slice(0, stringLenth) + '...';
    }
    return value;
  }
}
