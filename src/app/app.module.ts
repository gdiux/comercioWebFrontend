import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';
import { PipesModule } from './pipes/pipes.module';
import { PagesModule } from './pages/pages.module';
import { DashboardModule } from './dashboard/dashboard.module';


// BY Gilmer 
// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
