import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  Resolve
} from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeComponent } from './employee/employee.component';

import { IEmployee } from './employee';
@Injectable()
export class EmployeesListResolver implements Resolve<any> {
  employees: IEmployee[] = [];
  constructor(private employeeService: EmployeeService) {}

  resolve() {
    return this.employeeService
    .getEmployees()
    .map(employees => employees);
  }
}
