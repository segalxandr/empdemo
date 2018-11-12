import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';

import { IEmployee } from './employee';
import { error } from 'protractor';
import { get } from 'http';
import { map } from 'rxjs/operator/map';

@Injectable()
export class EmployeeService {
  private EMPLOYEES: IEmployee[] = [
    {
      id: 1,
      name: 'Samantha Talbert',
      title: 'Sr Analyst',
      gender: 'female',
      profileImage: 'http://via.placeholder.com/28x28'
    },
    {
      id: 2,
      name: 'Daniel Smith',
      title: 'Business Developer',
      gender: 'male',
      profileImage: 'http://via.placeholder.com/28x28'
    },
    {
      id: 3,
      name: 'Farid Khan',
      title: 'Financial advisor',
      gender: 'male',
      profileImage: 'http://via.placeholder.com/28x28'
    },
    {
      id: 4,
      name: 'Angela Michale',
      title: 'Product Manager',
      gender: 'female',
      profileImage: 'http://via.placeholder.com/28x28'
    },
    {
      id: 5,
      name: 'Thomas Fikle',
      title: 'Account Director',
      gender: 'male',
      profileImage: 'http://via.placeholder.com/28x28'
    },
    {
      id: 6,
      name: 'Mark Madrake',
      title: 'Jr Account Executive',
      gender: 'male',
      profileImage: 'http://via.placeholder.com/28x28'
    }
  ];
  avaId: string;
  avatar: string;
  useUiNames = false;
  constructor(private http: Http) {}

  getEmployee(employeeId: number): Observable<IEmployee> {
    const subject = new Subject<IEmployee>();
    console.log(employeeId);
    setTimeout(() => {
      const emp = this.EMPLOYEES.find(employee => employee.id === Number(employeeId));
      this.getImg(emp);
      subject.next(emp);
      subject.complete();
    }, 500);
    return subject;
  }

  getEmployees(): Observable<any> {
    this.EMPLOYEES.forEach(element => {
      this.getImg(element);
    });
    const subject = new Subject<any>();
    setTimeout(() => {
      subject.next(this.EMPLOYEES);
      subject.complete();
    }, 10);

    return subject;
  }
  getImg(emp: IEmployee): void {
    // Toggle this to avoid hitting uinames
    this.useUiNames = true;
    console.log(emp.profileImage);
    if (emp.profileImage.indexOf('placeholder') === -1) {
      return;
    }
    let str: string;
    // Used as substitute
    str = this.makeAvatarRequest();
    this.EMPLOYEES.find(e => e.id === emp.id).profileImage = str;

    if (this.useUiNames) {
      const region = 'United States';
      const obs$ = this.http
        .get('https://uinames.com/api/?ext&amount=1&gender=' + emp.gender + '&region=' + region)
        .map((response: Response) => {
          if (!response.ok) {
            return;
          } else {
            const d = response.json();
            return d;
          }
        })
        .subscribe(
          data => {
            str = data.photo;
            this.EMPLOYEES.find(e => e.id === emp.id).profileImage = str;
            // console.log(this.EMPLOYEES.find(e => e.id === emp.id).profileImage);
          },
          err => {
            console.error('Oops:', err);
          }
        );
    }
  }
  makeAvatarRequest(): string {
    this.avaId =
      Math.random()
        .toString(36)
        .substring(2, 2) +
      Math.random()
        .toString(36)
        .substring(2, 3);
    console.log('avaId: ', this.avaId);
    return (this.avatar = 'https://api.adorable.io/avatars/55/' + this.avaId);
  }
}
