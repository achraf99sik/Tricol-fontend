import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateOrderDto, ProductDto, SupplierDto, OrderProduct } from '../../interfaces/api.interface';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  templateUrl: './order-form.component.html',
  imports: [CommonModule, FormsModule],
})
export class OrderFormComponent implements OnInit {
  order: CreateOrderDto = {
    supplier: '',
    products: [],
  };
  suppliers: SupplierDto[] = [];
  products: ProductDto[] = [];

  @Output() orderCreated = new EventEmitter<void>();

  @ViewChild('formCard') formCard!: ElementRef;

  constructor(
    private api: ApiService,
    private animationService: AnimationService
  ) {}

  ngOnInit() {
    this.api.getSuppliers().subscribe((res) => (this.suppliers = res));
    this.api.getProducts().subscribe((res) => (this.products = res));
  }

  ngAfterViewInit() {
    this.animationService.animateIn(this.formCard.nativeElement);
  }

  toggleProductSelection(product: ProductDto) {
    const existingOrderProduct = this.order.products.find(
      (p) => p.productId === product.id
    );

    if (existingOrderProduct) {
      this.order.products = this.order.products.filter(
        (p) => p.productId !== product.id
      );
    } else {
      this.order.products.push({ productId: product.id!, quantity: 1 });
    }
  }

  submit() {
    this.animationService.animateOut(this.formCard.nativeElement, () => {
      this.api.createOrder(this.order).subscribe(() => {
        this.orderCreated.emit();
      });
    });
  }

  isSelected(product: ProductDto) {
    return this.order.products.some((p) => p.productId === product.id);
  }

  getProductQuantity(product: ProductDto): number {
    const orderProduct = this.order.products.find(p => p.productId === product.id);
    return orderProduct ? orderProduct.quantity : 0;
  }

  setProductQuantity(product: ProductDto, quantity: number) {
    const orderProduct = this.order.products.find(p => p.productId === product.id);
    if (orderProduct) {
      orderProduct.quantity = quantity;
    }
  }
}
