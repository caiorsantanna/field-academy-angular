import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Customer, PageService } from './page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public customers: Customer[] = []

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pageService: PageService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      document: ['', [Validators.minLength(11), Validators.maxLength(14), Validators.pattern(/\d+/g)]]
    });

    this.customers = this.pageService.customers;
  }

  public ngOnInit(): void {
    this.pageService.customersListChanged$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((customers) => {
      this.customers = customers;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public createCustomer(): void {
    if (this.form.invalid) { return; }

    this.pageService.createCustomer(this.form.value)
    this.form.reset();
  }

  public removeCustomer(customer: Customer): void {
    this.pageService.removeCustomer(customer);
  }

  public getErrorMessage(formControlName: string): string | undefined {
    const formControl = this.form.get(formControlName);
    if (!formControl) { return; }

    if (formControl.hasError('required')) {
      return 'Campo obrigatório'
    }

    if (formControl.hasError('email')) {
      return 'Email inválido'
    }

    if (formControl.hasError('minlength') && formControlName === 'name') {
      return 'Insira no mínimo 3 letras'
    }

    if (formControl.hasError('minlength') && formControlName === 'document') {
      return 'Insira no mínimo 11 letras'
    }

    if (formControl.hasError('maxlength') && formControlName === 'document') {
      return 'Insira no máximo 14 letras'
    }

    if (formControl.hasError('pattern') && formControlName === 'document') {
      return 'Documento inválido'
    }

    return;
  }
}
