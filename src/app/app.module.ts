import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { SinglelogComponent } from './containers/logs/singlelog/singlelog.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { TitleComponent } from './title/title.component';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { LoaderComponent } from './util/loader/loader.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'containers', component: ContainersComponent, canActivate: [AuthGuardService]},
  {path: 'container/:id', component: ContainerComponent, canActivate: [AuthGuardService]}
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
    LogsComponent,
    SinglelogComponent,
    LoginComponent,
    TitleComponent,
    LoaderComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    NgChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
