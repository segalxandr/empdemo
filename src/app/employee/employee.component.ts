import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeService } from '../employee.service';

// import { IEmployee } from '../employee';
@Component({
  selector: 'emp-app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  pageTitle = 'Employee Detail';
  employee: any;
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) {}
  goBack() {
    this.router.navigate(['/employees']);
  }
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.pageTitle = this.pageTitle + ', id: ' + id;
    this.employee = this.employeeService.getEmployee(id).subscribe(employee => (this.employee = employee));
    console.log('​EmployeeComponent -> ngOnInit -> this.employee', this.employee);
  }
}
