import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlavniServisService } from '../glavni-servis.service';

@Component({
  selector: 'app-soba',
  templateUrl: './soba.component.html',
  styleUrls: ['./soba.component.css']
})
export class SobaComponent implements OnInit {

  constructor(private router: Router, private servis: GlavniServisService) { }

  ngOnInit(): void {
  }

  nova;
  soba
  message;

  napravi(){
    this.servis.postoji(this.nova).subscribe((data)=> {
      if(data[0] == undefined || data[0] == null){
        this.servis.napraviNovu(this.nova).subscribe((mes)=> {
          if(mes['uspeh']=== 'ok'){
            this.message = "Nova soba je napravljena";
          }
        })
      } else {
        this.message = "Naziv sobe je zauzet";
      }
    })
  }

  pridruzi(){
    this.servis.postoji(this.soba).subscribe((data)=> {
      localStorage.setItem('soba', this.soba);
      if(data[0] != undefined){
        this.router.navigate(['/videopoziv']);
      }
    })
  }

}
