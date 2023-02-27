import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Customer {
  name: string;
  email: string;
  document?: string;
}

@Injectable()
export class PageService {
  public customers: Customer[] = [{ name: 'caio', email: 'caio@field' }];
  public customersListChanged$: Subject<Customer[]> = new Subject<Customer[]>();

  constructor() {}

  public createCustomer(customer: Customer): void {
    this.customers.push(customer);
    this.customersListChanged$.next(this.customers);
  }

  public removeCustomer(customer: Customer): void {
    const index = this.customers.indexOf(customer);
    this.customers.splice(index, 1);
    this.customersListChanged$.next(this.customers);
  }
}
