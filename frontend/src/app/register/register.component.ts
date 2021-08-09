import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlavniServisService } from '../glavni-servis.service';
import { Student } from '../student.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private servis: GlavniServisService) { }

  ngOnInit(): void {
  }

  name: String;
  lastname: String;
  username: String;
  password1: string;
  password2: String;
  skola: String;
  mail: String;

  strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{7,})");  
  startRegex = new RegExp("^[a-zA-Z]");

  registracija() {
    if(this.strongRegex.test(this.password1) && this.startRegex.test(this.password1)) {
        if(this.password1 !== this.password2){
          alert('Šifre moraju biti iste.');
        } else {
          this.servis.jedinstvenUsername(this.username).subscribe(
            (student: Student)=>{
            if(Object.keys(student).length === 0) {
              this.servis.register(this.name, this.lastname, this.username, this.password1, this.skola,
                this.mail).subscribe(
                  (student) => {
                    if(student['uspeh']=== 'ok'){
                      alert('Registracija je uspešna!')                                      
                      setTimeout(() => {
                        this.router.navigate(['/']);
                      }, 2000); 
                    } else {
                      alert('Greška!')
                    }
                });
            } else { alert('Ovo korisničko ime je već zauzeto.');}
          })
        }
    } else {
      alert('Šifra u neispravnom formatu.');
    }
  
}
}
