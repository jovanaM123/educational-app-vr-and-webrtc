import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../courses.module';
import { GlavniServisService } from '../glavni-servis.service';

@Component({
  selector: 'app-kursevi',
  templateUrl: './kursevi.component.html',
  styleUrls: ['./kursevi.component.css']
})
export class KurseviComponent implements OnInit {

  constructor(private router: Router, private servis: GlavniServisService) { }

  ngOnInit(): void {
    this.dohvKurseve();
  }

  kursevi: Array<Course>;


  dohvKurseve(){
    let username = localStorage.getItem('logged');
    
     this.servis.kursevi(username).subscribe((data:Array<Course>)=> {   
       this.kursevi = data;
     })
  }

}
