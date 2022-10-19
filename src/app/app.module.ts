import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChartComponent } from './dashboard/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatsComponent } from './dashboard/stats/stats.component';
import { ContainersComponent } from './containers/containers.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'containers', component: ContainersComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    ChartComponent,
    DashboardComponent,
    StatsComponent,
    ContainersComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
