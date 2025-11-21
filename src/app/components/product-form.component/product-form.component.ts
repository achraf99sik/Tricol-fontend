import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ProductDto } from '../../interfaces/api.interface';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  imports: [FormsModule]
})
export class ProductFormComponent implements OnInit {
  product: ProductDto = { name: '', category: '', quantity: 0, unitPrice: 0 };
  id: string | null = null;

  @ViewChild('formCard') formCard!: ElementRef;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private animationService: AnimationService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.api.getProduct(this.id).subscribe((res) => (this.product = res));
    }
  }

  ngAfterViewInit() {
    this.animationService.animateIn(this.formCard.nativeElement);
  }

  submit() {
    this.animationService.animateOut(this.formCard.nativeElement, () => {
      if (this.id) {
        this.api
          .updateProduct(this.id, this.product)
          .subscribe(() => this.router.navigate(['/products']));
      } else {
        this.api
          .createProduct(this.product)
          .subscribe(() => this.router.navigate(['/products']));
      }
    });
  }
}
