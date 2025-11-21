import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from '../order-form.component/order-form.component';

@Component({
  selector: 'app-stock-movements',
  standalone: true,
  imports: [CommonModule, OrderFormComponent],
  templateUrl: './stock-movements.component.html',
})
export class StockMovementsComponent implements OnInit {
  movements: any[] = [];
  showForm = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadMovements();
  }

  loadMovements() {
    this.api.getStockMovements().subscribe((res) => {
      this.movements = res;
    });
  }

  onOrderCreated() {
    this.showForm = false;
    this.loadMovements();
  }
}

