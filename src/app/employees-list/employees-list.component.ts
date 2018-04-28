import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EmployeeService } from '../employee.service';
import { IEmployee } from '../employee';
@Component({
  selector: 'emp-app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: any;
  showImage = true;
  showData = true;
  showTitle = 'Hide Image';
  showTable = 'Hide Table';
  private _sortBy = 'votes';
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}
  get sortBy(): string {
    return this._sortBy;
  }
  set sortBy(val: string) {
    this._sortBy = val;
    console.log('sort set', val);
    this.sortBy === 'name'
    ? this.employees.sort(sortByNameAsc)
    : this.employees.sort(sortByTitleAsc);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
    this.showTitle = this.showImage ? 'Hide Image' : 'Show Image';
  }
  toggleData(): void {
    this.showData = !this.showData;
    this.showTable = this.showData ? 'Hide Table' : 'Show Table';
  }
  ngOnInit() {
    console.log('init');
    this.employees = this.route.snapshot.data['employees'];
  }

  setSort(s: string) {
    console.log('setSort', s);
    this.sortBy = s;
  }
}
function sortByNameAsc(e1: IEmployee, e2: IEmployee) {

  if (e1.name > e2.name) {
    return 1;
  } else if (e1.name === e2.name) {
    return 0;
  } else {
    return -1;
  }
}
function sortByTitleAsc(e1: IEmployee, e2: IEmployee) {
  if (e1.title > e2.title) {
    return 1;
  } else if (e1.title === e2.title) {
    return 0;
  } else {
    return -1;
  }
}
