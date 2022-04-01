import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-alerts";
import {HttpClientModule} from "@angular/common/http";
import { PostComponent } from './components/post/post.component';
import { TableModule } from 'ngx-easy-table';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PostComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      TableModule,
      AlertModule.forRoot({maxMessages: 5, timeout: 5000})
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
