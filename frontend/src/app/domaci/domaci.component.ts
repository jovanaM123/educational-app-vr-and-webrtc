import { Component, OnInit } from '@angular/core';
import { Exam } from '../exam.module';
import { Router } from '@angular/router';
import { GlavniServisService } from '../glavni-servis.service';

@Component({
  selector: 'app-domaci',
  templateUrl: './domaci.component.html',
  styleUrls: ['./domaci.component.css']
})
export class DomaciComponent implements OnInit {

  constructor(private router: Router, private servis: GlavniServisService) { }

  ngOnInit(): void {
    this.dohvDomace();
  }

  domaci: Array<Exam>;


  dohvDomace(){
     this.servis.domaci().subscribe((data:Array<Exam>)=> {   
       this.domaci = data;
     })
  }

}
