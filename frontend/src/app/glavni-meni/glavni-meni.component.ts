import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { GlavniServisService } from '../glavni-servis.service';

@Component({
  selector: 'app-glavni-meni',
  templateUrl: './glavni-meni.component.html',
  styleUrls: ['./glavni-meni.component.css']
})
export class GlavniMeniComponent implements OnInit {

  constructor(private router: Router, private servis: GlavniServisService) { }

  ngOnInit(): void {
  }
  
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }


  logout(){
    let username = localStorage.getItem('logged');
        this.servis.odjava(username).subscribe((mess: String)=> {
          if(mess == "ok") {
            localStorage.removeItem('logged');
            if(localStorage.getItem('soba')!==undefined){
              localStorage.removeItem('soba');
            }            
            this.router.navigate(['/']);          }
        })
  }
}
