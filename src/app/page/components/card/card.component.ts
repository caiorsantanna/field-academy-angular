import { Component, Input } from '@angular/core';
import { Customer } from '../../page.service';

@Component({
  selector: 'app-page-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() customer!: Customer
}
