import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { questions } from '../questions';

@Component({
  selector: 'app-pitanja',
  templateUrl: './pitanja.component.html',
  styleUrls: ['./pitanja.component.css']
})
export class PitanjaComponent implements OnInit, DoCheck {

  questions: any;
  @Input() questionIndex: number = 0;
  currentQuestion: string = "";
  currentOptions: string = "";
  points = 0;
  @Output() score = new EventEmitter<{score: Number}>();

  constructor() { }

  ngOnInit(): void {
    this.questions = questions;
   }
 
   ngDoCheck(): void {
     if(this.questionIndex < 10) {
        this.currentQuestion = this.questions[this.questionIndex].questionText;
        this.currentOptions = this.questions[this.questionIndex].answers;
     }
  }

  setUserAnswer(point: number) {
    this.points += point; 
    this.score.emit({score: this.points});
  }
}
