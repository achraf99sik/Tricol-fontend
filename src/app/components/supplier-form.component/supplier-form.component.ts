import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupplierDto } from '../../interfaces/api.interface';
import { AnimationService } from '../../services/animation.service';
import gsap from 'gsap';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  imports: [CommonModule, FormsModule],
})
export class SupplierFormComponent implements OnInit {
  supplier: SupplierDto = { company: '', orders: [] };
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
    console.log('Supplier ID from route:', this.id);
    if (this.id) {
      this.api.getSupplier(this.id).subscribe((res) => {
        console.log('Supplier data fetched:', res);
        this.supplier = res;
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
        this.router.navigate(['/suppliers']);
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
            .updateSupplier(this.id, this.supplier)
            .subscribe(() => this.router.navigate(['/suppliers']));
        } else {
          this.api
            .createSupplier(this.supplier)
            .subscribe(() => this.router.navigate(['/suppliers']));
        }
      },
    });
  }
}
