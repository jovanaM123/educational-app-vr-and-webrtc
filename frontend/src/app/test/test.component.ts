import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlavniServisService } from '../glavni-servis.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  currentIndex = 0;
  totalScore = 0;
  quizOver = false;
  ok = false;

  constructor(private router: Router, private servis: GlavniServisService) { }

  ngOnInit(): void {
   }
 
   goNext() {
    this.currentIndex++;
   
    if (this.currentIndex > 9){
      this.endQuiz();
    } 

  }

  receiveScore(receivedScore: { score: number; }) {    
    this.totalScore = receivedScore.score;
  }

  restartQuiz() {
    this.quizOver = false;
    this.ok = false;
    this.totalScore = 0;
    this.currentIndex = 0;
  }


  endQuiz() {
    this.quizOver = true;
    
    //send to backend to send email
    let username = localStorage.getItem("logged");
    console.log(this.totalScore);
    
    this.servis.posaljiRez(this.totalScore, username).subscribe((mess)=> {
      if(mess === "ok"){
        this.ok = true;
      }
    })
  }


  goTo() {
    this.router.navigate(['/tracker']);
  }

}
