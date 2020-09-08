import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { MenuItemComponent } from './order/menu-item/menu-item.component';
import { CartComponent } from './order/cart/cart.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ControladminComponent } from './controladmin/controladmin.component';
import { OrdercardComponent } from './activities/ordercard/ordercard.component';
import { UserdetailsComponent } from './activities/userdetails/userdetails.component';
import { OrderdetailsComponent } from './activities/orderdetails/orderdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    OrderComponent,
    MenuItemComponent,
    CartComponent,
    LoadingSpinnerComponent,
    ActivitiesComponent,
    ControladminComponent,
    OrdercardComponent,
    UserdetailsComponent,
    OrderdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
