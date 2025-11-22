import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ProductDto } from '../../interfaces/api.interface';
import { AnimationService } from '../../services/animation.service';
import gsap from 'gsap';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  imports: [FormsModule],
})
export class ProductFormComponent implements OnInit {
  product: ProductDto = { name: '', category: '', quantity: 0, unitPrice: 0 };
  id: string | null = null;

  @ViewChild('formCard') formCard!: ElementRef;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private animationService: AnimationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Product ID from route:', this.id);
    if (this.id) {
      this.api.getProduct(this.id).subscribe((res) => {
        console.log('Product data fetched:', res);
        this.product = res;
        this.cdr.detectChanges();
      });
    }
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
        this.router.navigate(['/products']);
      },
    });
  }

  submit() {
    gsap.to(this.formCard.nativeElement, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        if (this.id) {
          this.api
            .updateProduct(this.id, this.product)
            .subscribe(() => this.router.navigate(['/products']));
        } else {
          this.api
            .createProduct(this.product)
            .subscribe(() => this.router.navigate(['/products']));
        }
      },
    });
  }
}
