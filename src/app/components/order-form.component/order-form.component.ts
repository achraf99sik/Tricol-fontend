import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CreateOrderDto,
  ProductDto,
  SupplierDto,
} from '../../interfaces/api.interface';
import { AnimationService } from '../../services/animation.service';
import gsap from 'gsap';
import { Router } from '@angular/router';

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
    private animationService: AnimationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.api.getSuppliers().subscribe((res) => (this.suppliers = res));
    this.api.getProducts().subscribe((res) => (this.products = res));
  }

  ngAfterViewInit() {
    gsap.from(this.formCard.nativeElement, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  cancel() {
    gsap.to(this.formCard.nativeElement, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        this.router.navigate(['/']);
      },
    });
  }

  submit() {
    gsap.to(this.formCard.nativeElement, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        this.api.createOrder(this.order).subscribe(() => {
          this.orderCreated.emit();
          this.router.navigate(['/']);
        });
      },
    });
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

  isSelected(product: ProductDto) {
    return this.order.products.some((p) => p.productId === product.id);
  }

  getProductQuantity(product: ProductDto): number {
    const orderProduct = this.order.products.find(
      (p) => p.productId === product.id
    );
    return orderProduct ? orderProduct.quantity : 0;
  }

  setProductQuantity(product: ProductDto, quantity: number) {
    const orderProduct = this.order.products.find(
      (p) => p.productId === product.id
    );
    if (orderProduct) {
      orderProduct.quantity = quantity;
    }
  }

  getTotalItems(): number {
    return this.order.products.reduce((acc, p) => acc + p.quantity, 0);
  }

  getTotalCost(): number {
    return this.order.products.reduce((acc, p) => {
      const product = this.products.find((prod) => prod.id === p.productId);
      return acc + (product ? product.unitPrice * p.quantity : 0);
    }, 0);
  }
}
