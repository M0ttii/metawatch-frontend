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
import { ContainerComponent } from './containers/container/container.component';
import { ContainercanvasComponent } from './containers/containercanvas/containercanvas.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { LogsComponent } from './containers/logs/logs.component';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'containers', component: ContainersComponent},
  {path: 'container/:id', component: ContainerComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    ChartComponent,
    DashboardComponent,
    StatsComponent,
    ContainersComponent,
    ContainerComponent,
    ContainercanvasComponent,
    DropdownDirective,
    LogsComponent
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
