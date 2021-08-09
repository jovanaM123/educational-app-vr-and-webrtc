import { Component, OnInit } from '@angular/core';
import { GlavniServisService } from '../glavni-servis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posalji',
  templateUrl: './posalji.component.html',
  styleUrls: ['./posalji.component.css']
})
export class PosaljiComponent implements OnInit {

  constructor(private router: Router, private servis: GlavniServisService) { }

  ngOnInit(): void {
  }


  message;
  fileToUpload: File  = null;
  name;

  handleFileInput(files: FileList) {
    var reader = new FileReader();
    reader.onload = function(){
      let text = reader.result;
      let t = text.toString();
      localStorage.setItem('cont', t);
    };
    reader.readAsDataURL(files[0]);
}

  posaljiDomaci(){
   let content = localStorage.getItem('cont');
   let username = localStorage.getItem("logged");
     this.servis.posaljiDom(content, username).subscribe((mess)=> {
       if(mess === "ok"){
         this.message = "Email uspesno poslat!";
       }
     })
  }
}
