import { stringify } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split',
})
export class SplitStringPipe implements PipeTransform {
  transform(value: string): string[][] {
    let row = 0,
      col = 0;
    let result = [];
    for (let i = 0; i < value.length; i++) {
      if (i < value.split(' ').length) result[i] = [];

      if (value[i] != ' ') {
        result[row][col++] = value[i];
      } else if (value[i] == ' ') {
        result[row][col] = value[i];
        row++;
        col = 0;
      }
    }
    return result;
  }
}
