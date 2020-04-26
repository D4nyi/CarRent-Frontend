import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { RentComponent } from './rent/rent.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'get', component: CarsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'rent', component: RentComponent, canActivate: [AuthGuard] },
  //{ path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
