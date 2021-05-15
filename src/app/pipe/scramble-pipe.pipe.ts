import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scramblePipe',
})
export class ScramblePipe implements PipeTransform {
  transform(input: string): string {
    let word = [...input];
    let shuffledWord: string;
    if (input.length <= 2) return input;
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);
    word.forEach(
      (elem, i, arr, j = getRandomValue(i, arr.length)) =>
        ([arr[i], arr[j]] = [arr[j], arr[i]])
    );
    shuffledWord = word.join('');
    return shuffledWord;
  }
}
