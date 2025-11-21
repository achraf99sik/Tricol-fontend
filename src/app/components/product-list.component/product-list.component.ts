import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ProductDto } from '../../interfaces/api.interface';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [RouterLink, CommonModule],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: ProductDto[] = [];

  @ViewChildren('productCard') productCards!: QueryList<ElementRef>;

  constructor(private api: ApiService, private animationService: AnimationService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  ngAfterViewInit() {
    this.productCards.changes.subscribe(() => {
      this.animationService.staggerAnimateIn(this.productCards.map((c) => c.nativeElement));
    });
  }

  fetchProducts() {
    this.api.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure?')) {
      const card = this.productCards.find((c) => c.nativeElement.id === id);
      if (card) {
        this.animationService.animateOut(card.nativeElement, () => {
          this.api.deleteProduct(id).subscribe(() => {
            this.products = this.products.filter((p) => p.id !== id);
          });
        });
      }
    }
  }
}
