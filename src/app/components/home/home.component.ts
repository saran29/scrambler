import { Component, OnInit } from '@angular/core';
import { ScrambleService } from 'src/app/service/scramble-service.service';
import { SentenceService } from 'src/app/service/sentence-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private service: SentenceService,
    private scramble: ScrambleService
  ) {}
  sentence: string;
  scrambled: string;
  counter = 1;
  score = 0;
  ngOnInit(): void {
    this.fetchSentence(this.counter);
  }

  fetchSentence(num: number) {
    this.service.getEachSentence(num).subscribe(
      (response) => {
        this.sentence = response.data.sentence;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.scrambled = this.scramble.scrambleSentence(this.sentence);
      }
    );
  }

  handleCorrectGuess() {
    if (this.counter <= 10) {
      if (this.counter != 10) this.fetchSentence(++this.counter);
      this.score++;
    }
  }
}
