import { Injectable } from '@angular/core';
import { ScramblePipe } from '../pipe/scramble-pipe.pipe';

@Injectable({
  providedIn: 'root',
})
export class ScrambleService {
  sentence: string;
  scrambled = '';
  constructor(private pipe: ScramblePipe) {}

  scrambleSentence(sentence: string): string {
    if (sentence != null && sentence.length > 2) {
      let words = sentence.split(' ');
      let randomized = words.map(this.pipe.transform);
      this.scrambled = randomized.join(' ');
    }
    return this.scrambled;
  }
}
