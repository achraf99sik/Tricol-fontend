import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupplierDto } from '../../interfaces/api.interface';
import { AnimationService } from '../../services/animation.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import gsap from 'gsap';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  imports: [RouterLink, CommonModule, LoadingSpinnerComponent],
})
export class SupplierListComponent implements OnInit, AfterViewInit {
  suppliers: SupplierDto[] = [];
  isLoading = true;

  @ViewChildren('supplierRow') supplierRows!: QueryList<ElementRef>;

  constructor(
    private api: ApiService,
    private animationService: AnimationService
  ) {}

  ngOnInit() {
    this.loadSuppliers();
  }

  ngAfterViewInit() {
    // Animate initial items if they exist
    if (this.supplierRows.length > 0) {
      this.animateRows(this.supplierRows.map((r) => r.nativeElement));
    }

    this.supplierRows.changes.subscribe(() => {
      this.animateRows(this.supplierRows.map((r) => r.nativeElement));
    });
  }

  private animateRows(elements: HTMLElement[]) {
    gsap.fromTo(
      elements,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out' }
    );
  }

  loadSuppliers() {
    this.isLoading = true;
    this.api.getSuppliers().subscribe({
      next: (res) => {
        this.suppliers = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  deleteSupplier(id: string) {
    if (confirm('Are you sure you want to delete this supplier?')) {
      const row = this.supplierRows.find((r) => r.nativeElement.id === id);
      if (row) {
        gsap.to(row.nativeElement, {
          opacity: 0,
          x: -50,
          duration: 0.3,
          onComplete: () => {
            this.api.deleteSupplier(id).subscribe({
              next: () => {
                this.suppliers = this.suppliers.filter((s) => s.id !== id);
              },
              error: (err) => {
                console.error('Delete failed', err);
                alert('Failed to delete supplier');
              },
            });
          },
        });
      }
    }
  }
}
