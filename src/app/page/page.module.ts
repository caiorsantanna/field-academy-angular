import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CpfCnpjFormatPipe } from '../core/pipes/cpf-cnpj-format.pipe';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { CardComponent } from './components/card/card.component';
import { PageService } from './page.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PageComponent,
    CardComponent,
    CpfCnpjFormatPipe
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [PageService]
})
export class PageModule { }
