import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlavniServisService } from '../glavni-servis.service';
import { Student } from '../student.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private servis: GlavniServisService) { }

  ngOnInit(): void {
  }

  username: String;
  password: String;
  message: String;

  login() {
    this.servis.logovanje(this.username, this.password).subscribe((student: Student) => {
      if(student[0]!=undefined){
        localStorage.setItem("logged", student[0].username);
        // na online 
        this.servis.online(this.username).subscribe((mess: String)=> {
          if(mess == "ok") {
            this.router.navigate(['/pocetna']);
          }
        })
      } else {
              this.message="Molimo Vas unesite dobre kredencijale!";
      }
    })
  }
}
