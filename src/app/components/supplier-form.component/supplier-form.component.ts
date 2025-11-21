import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupplierDto } from '../../interfaces/api.interface';
import { AnimationService } from '../../services/animation.service';

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
    private animationService: AnimationService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.api.getSupplier(this.id).subscribe((res) => (this.supplier = res));
    }
  }

  ngAfterViewInit() {
    this.animationService.animateIn(this.formCard.nativeElement);
  }

  submit() {
    this.animationService.animateOut(this.formCard.nativeElement, () => {
      if (this.id) {
        this.api
          .updateSupplier(this.id, this.supplier)
          .subscribe(() => this.router.navigate(['/suppliers']));
      } else {
        this.api
          .createSupplier(this.supplier)
          .subscribe(() => this.router.navigate(['/suppliers']));
      }
    });
  }
}
