import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeService } from './employee.service';
import { appRoutes } from './routes';
import { EmployeesListResolver } from './employees-list-resolver.service';

@NgModule({
  declarations: [AppComponent, EmployeeComponent, EmployeesListComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    HttpModule
  ],
  providers: [EmployeeService, EmployeesListResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
