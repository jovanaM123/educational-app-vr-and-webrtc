import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeFileForInjectables } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GlavniServisService {

  uri = "http://localhost:4000";

  constructor(private http: HttpClient) { }


  logovanje(username, pass){
    const data = {
      username: username,
      pass: pass
    }
    
    return this.http.post(`${this.uri}/login`, data);
  }


  
  jedinstvenUsername(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/okUsername`, data);
  }


  register(name, lastname, username, password, school, mail) {
    const data = {
      name: name,
      lastname: lastname,
      username: username,
      password: password,
      mail: mail,
      school: school,
      online: false
    }

    return this.http.post(`${this.uri}/register`, data);
  }

  online(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/online`, data);
  }

    
  odjava(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/odjava`, data);
  }

  domaci() {
    return this.http.get(`${this.uri}/d/domaci`);
  }

  kursevi(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/k/kursevi`, data);
  }

  posaljiRez(score, username){
    const data = {
      username: username,
      score: score,
    }
    return this.http.post(`${this.uri}/e/posaljirez`, data);
  }

  posaljiDom(fajl, username){
    const data = {
      username: username,
      fajl: fajl,
    }
    return this.http.post(`${this.uri}/e/posaljidomaci`, data);
  }

  postoji(soba){
    const data = {
      soba: soba,
    }
    return this.http.post(`${this.uri}/v/postojiSoba`, data);
  }

  napraviNovu(name){
    const data = {
      name: name,
    }
    return this.http.post(`${this.uri}/v/napraviNovu`, data);
  }
}
