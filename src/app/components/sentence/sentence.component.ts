import { Component, Input, OnInit } from '@angular/core';
import { ScrambleService } from 'src/app/service/scramble-service.service';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.css'],
})
export class SentenceComponent implements OnInit {
  constructor() {}
  @Input() sentence: string;
  ngOnInit(): void {}
}
