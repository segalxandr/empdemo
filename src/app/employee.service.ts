import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';

import { IEmployee } from './employee';

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
  constructor(private http: Http) {}
  getEmployee(employeeId: number): Observable<any> {
    const subject = new Subject<any>();
    console.log(employeeId);
    setTimeout(() => {
      subject.next(
        this.EMPLOYEES.find(employee => employee.id === +employeeId)
      );
      subject.complete();
    }, 1000);
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
     console.log(emp.profileImage);
    if (emp.profileImage.indexOf('placeholder') === -1) {
      return;
    }
    let str: string;
    this.http
      .get('https://uinames.com/api/?ext&amount=1&gender=' + emp.gender)
      .map((response: Response) => {
        const d = response.json();
        return d;
      })
      .subscribe(data => {
        str = data.photo;
        this.EMPLOYEES.find(e => e.id === emp.id).profileImage = str;
        // console.log(this.EMPLOYEES.find(e => e.id === emp.id).profileImage);
      });
  }
}
