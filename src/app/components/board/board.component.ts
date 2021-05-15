import {
  Component,
  Input,
  OnInit,
  ElementRef,
  ViewChildren,
  QueryList,
  EventEmitter,
  Output,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { SplitStringPipe } from 'src/app/pipe/split-string.pipe';
import { match } from 'src/app/input.validator';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, AfterViewInit {
  _sentence: string;
  words: string[];
  wordForm: FormGroup;
  characters: string[][];
  counter = 0;
  @ViewChildren('character') cells: QueryList<ElementRef>;
  @ViewChild('submit') button: ElementRef;
  @Input()
  set sentence(sentence: string) {
    if (sentence != null) {
      this._sentence = sentence;
      this.characters = this.pipe.transform(sentence);
      let rows = this.wordForm.get('rows') as FormArray;
      this.counter = 0;
      rows.clear();
      this.populateRows();
    }
  }
  get sentence(): string {
    return this._sentence;
  }
  @Output()
  correctGuess: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private pipe: SplitStringPipe) {
    this.wordForm = this.formBuilder.group({
      rows: this.formBuilder.array([], Validators.required),
    });
  }

  ngOnInit(): void {
    this.wordForm.statusChanges.subscribe((newStatus) => {
      if (newStatus && this.button !== undefined)
        this.button.nativeElement.focus();
    });
  }

  ngAfterViewInit(): void {
    this.cells.changes.subscribe((elements) => {
      elements.first.nativeElement.focus();
    });
  }

  populateRows() {
    for (let row = 0; row < this.characters.length; row++) {
      (<FormArray>this.wordForm.get('rows')).push(
        new FormGroup({
          columns: new FormArray(this.populateColumns(this.characters[row])),
        })
      );
    }
  }

  populateColumns(word: string[]): any {
    let controls = [];
    for (let col = 0; col < word.length; col++) {
      controls.push(
        new FormGroup({
          character: new FormControl('', match(word[col])),
        })
      );
    }
    return controls;
  }

  onKey(event: any, row: number, column: number, size: number) {
    let value = this.getValue(row, column);
    if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122) ||
      event.keyCode == 32
    ) {
      if (
        event.target.value.toLowerCase() ===
        this.characters[row][column].toLowerCase()
      ) {
        event.target.classList.add('matched');
      }
      if (this.counter < this.sentence.length) {
        this.moveFocus(++this.counter);
      }
    } else if (event.keyCode == 8 && this.counter >= 1) {
      if (this.counter == this.sentence.length && value != '') {
        this.deleteElement(this.counter - 1);
      } else {
        this.deleteElement(--this.counter);
      }
    }
  }

  moveFocus(index: number) {
    if (this.cells.length !== 0) {
      if (index < this.sentence.length) {
        let element = this.getElement(index);
        element.focus();
      }
    }
  }

  getElement(index: number) {
    if (this.cells.length !== 0) {
      return this.cells.toArray()[0].nativeElement.form[index];
    }
  }

  getValue(row: number, column: number) {
    let arrayControl = this.wordForm.get('rows') as FormArray;
    let value = arrayControl.value;
    return value[row].columns[column].character;
  }

  deleteElement(index: number) {
    if (index >= 0 && index < this.sentence.length) {
      let element = this.getElement(index);
      element.focus();
      element.value = '';
      element.classList.remove('matched');
    }
  }

  onSubmit() {
    this.correctGuess.emit(true);
  }
}
