import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { SupplierDto } from '../../interfaces/api.interface';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  imports: [RouterLink, CommonModule],
})
export class SupplierListComponent implements OnInit, AfterViewInit {
  suppliers: SupplierDto[] = [];

  @ViewChildren('supplierCard') supplierCards!: QueryList<ElementRef>;

  constructor(private api: ApiService, private animationService: AnimationService) {}

  ngOnInit() {
    this.loadSuppliers();
  }

  ngAfterViewInit() {
    this.supplierCards.changes.subscribe(() => {
      this.animationService.staggerAnimateIn(this.supplierCards.map((c) => c.nativeElement));
    });
  }

  loadSuppliers() {
    this.api.getSuppliers().subscribe((res) => {
      this.suppliers = res;
    });
  }

  deleteSupplier(id: string) {
    if (confirm('Are you sure you want to delete this supplier?')) {
      const card = this.supplierCards.find((c) => c.nativeElement.id === id);
      if (card) {
        this.animationService.animateOut(card.nativeElement, () => {
          this.api.deleteSupplier(id).subscribe({
            next: () => {
              // remove deleted supplier from the list
              this.suppliers = this.suppliers.filter((s) => s.id !== id);
            },
            error: (err) => {
              console.error('Delete failed', err);
              alert('Failed to delete supplier');
            },
          });
        });
      }
    }
  }
}
