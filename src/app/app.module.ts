import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { CarsComponent } from './cars/cars.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { DetailComponent } from './detail-rent/detail/detail.component';
import { DetailRentComponent } from './detail-rent/detail-rent.component';
import { RentComponent } from './detail-rent/rent/rent.component';
import { RegisterComponent } from './register/register.component';
import { RentedCarComponent } from './rented-car/rented-car.component';
import { AdminComponent } from './admin/admin.component';
import { ModifyComponent } from './admin/modify/modify.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    HomeComponent,
    HeaderComponent,
    AuthComponent,
    DetailRentComponent,
    DetailComponent,
    RentComponent,
    RegisterComponent,
    RentedCarComponent,
    AdminComponent,
    ModifyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
