import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PozivComponent } from './poziv/poziv.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PomocComponent } from './pomoc/pomoc.component';
import { DomaciComponent } from './domaci/domaci.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PredavanjaComponent } from './predavanja/predavanja.component';
import { MatematikaComponent } from './matematika/matematika.component';
import { GeometrijaComponent } from './geometrija/geometrija.component';
import { NjujorkComponent } from './njujork/njujork.component';
import { KoronaComponent } from './korona/korona.component';
import { VideopozivComponent } from './videopoziv/videopoziv.component';
import { PosaljiComponent } from './posalji/posalji.component';
import { SobaComponent } from './soba/soba.component';
import { KurseviComponent } from './kursevi/kursevi.component';
import { TestComponent } from './test/test.component';
import { PitanjaComponent } from './pitanja/pitanja.component';
import { TrackerComponent } from './tracker/tracker.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registracija', component: RegisterComponent},
  {path: 'pomoc', component: PomocComponent},
  {path: 'domaci', component: DomaciComponent},
  {path: 'pocetna', component: PocetnaComponent},
  {path: 'predav', component: PredavanjaComponent},
  {path: 'poziv', component: PozivComponent},
  {path: 'matematika', component: MatematikaComponent},
  {path: 'geometrija', component: GeometrijaComponent},
  {path: 'njujork', component: NjujorkComponent},
  {path: 'covid', component: KoronaComponent},
  {path: 'videopoziv', component: VideopozivComponent},
  {path: 'posalji', component: PosaljiComponent},
  {path: 'soba', component: SobaComponent},
  {path: 'kursevi', component: KurseviComponent},
  {path: 'test', component: TestComponent}, 
  {path: 'pitanja', component: PitanjaComponent}, 
  {path: 'tracker', component: TrackerComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
