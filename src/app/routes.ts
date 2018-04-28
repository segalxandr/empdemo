import { Routes } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesListResolver } from './employees-list-resolver.service';

export const appRoutes: Routes = [
  {
    path: 'employees',
    component: EmployeesListComponent,
    resolve: { employees: EmployeesListResolver }
  },
  { path: 'employees/:id', component: EmployeeComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' }
];
