import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// MODULES
import { PagesRoutingModule } from './pages/pages.routing';
import { LoginRoutingModule } from './auth/auth.routing';
import { DashboardRoutingModule } from './dashboard/dashboard.routing';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    LoginRoutingModule,
    DashboardRoutingModule
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
