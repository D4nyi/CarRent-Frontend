import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { DetailRentComponent } from './detail-rent/detail-rent.component';
import { AuthGuard } from './services/auth.guard';
import { RentComponent } from './detail-rent/rent/rent.component';
import { RegisterComponent } from './register/register.component';
import { RentedCarComponent } from './rented-car/rented-car.component';
import { AdminComponent } from './admin/admin.component';
import { ModifyComponent } from './admin/modify/modify.component';
import { AdminGuard } from './services/admin.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'rented', component: RentedCarComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  {
    path: 'detail',
    component: DetailRentComponent,
    children: [{ path: 'rent', component: RentComponent, canActivate: [AuthGuard] }]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/modify', component: ModifyComponent, canActivate: [AdminGuard] }
  // { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
