import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { DetailRentComponent } from './detail-rent/detail-rent.component';
import { AuthGuard } from './services/auth.guard';
import { RentComponent } from './detail-rent/rent/rent.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'detail',
    component: DetailRentComponent,
    children: [{ path: 'rent', component: RentComponent, canActivate: [AuthGuard] }]
  },
  { path: 'register', component: RegisterComponent },
  // { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
