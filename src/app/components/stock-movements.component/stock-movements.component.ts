import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from '../order-form.component/order-form.component';
import gsap from 'gsap';

@Component({
  selector: 'app-stock-movements',
  standalone: true,
  imports: [CommonModule, OrderFormComponent],
  templateUrl: './stock-movements.component.html',
})
export class StockMovementsComponent implements OnInit, AfterViewInit {
  movements: any[] = [];
  showForm = false;

  @ViewChildren('movementRow') movementRows!: QueryList<ElementRef>;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadMovements();
  }

  ngAfterViewInit() {
    this.movementRows.changes.subscribe(() => {
      gsap.fromTo(
        this.movementRows.map((r) => r.nativeElement),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
      );
    });
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
