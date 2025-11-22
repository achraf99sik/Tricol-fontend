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
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import gsap from 'gsap';

@Component({
  selector: 'app-stock-movements',
  standalone: true,
  imports: [CommonModule, OrderFormComponent, LoadingSpinnerComponent],
  templateUrl: './stock-movements.component.html',
})
export class StockMovementsComponent implements OnInit, AfterViewInit {
  movements: any[] = [];
  showForm = false;
  isLoading = true;

  @ViewChildren('movementRow') movementRows!: QueryList<ElementRef>;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadMovements();
  }

  ngAfterViewInit() {
    // Animate initial items if they exist
    if (this.movementRows.length > 0) {
      this.animateRows(this.movementRows.map((r) => r.nativeElement));
    }

    this.movementRows.changes.subscribe(() => {
      this.animateRows(this.movementRows.map((r) => r.nativeElement));
    });
  }

  private animateRows(elements: HTMLElement[]) {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
    );
  }

  loadMovements() {
    this.isLoading = true;
    this.api.getStockMovements().subscribe({
      next: (res) => {
        this.movements = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onOrderCreated() {
    this.showForm = false;
    this.loadMovements();
  }
}
