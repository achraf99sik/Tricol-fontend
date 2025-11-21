import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SupplierDto,
  ProductDto,
  SupplierOrderDto,
  StockMovementDto,
  CreateOrderDto,
} from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  // Suppliers
  getSuppliers(): Observable<SupplierDto[]> {
    return this.http.get<SupplierDto[]>(
      `${this.baseUrl}/suppliers`
    );
  }
  getSupplier(id: string): Observable<SupplierDto> {
    return this.http.get<SupplierDto>(`${this.baseUrl}/suppliers/${id}`);
  }
  createSupplier(supplier: SupplierDto) {
    return this.http.post<SupplierDto>(`${this.baseUrl}/suppliers`, supplier);
  }
  updateSupplier(id: string, supplier: SupplierDto) {
    return this.http.put<SupplierDto>(
      `${this.baseUrl}/suppliers/${id}`,
      supplier
    );
  }
  deleteSupplier(id: string) {
    return this.http.delete(`${this.baseUrl}/suppliers/${id}`);
  }

  // Products
  getProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.baseUrl}/products`);
  }
  getProduct(id: string): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.baseUrl}/products/${id}`);
  }
  createProduct(product: ProductDto) {
    return this.http.post<ProductDto>(`${this.baseUrl}/products`, product);
  }
  updateProduct(id: string, product: ProductDto) {
    return this.http.put<ProductDto>(`${this.baseUrl}/products/${id}`, product);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  // Orders
  getOrders(): Observable<SupplierOrderDto[]> {
    return this.http.get<SupplierOrderDto[]>(
      `${this.baseUrl}/orders`
    );
  }
  getOrder(id: string): Observable<SupplierOrderDto> {
    return this.http.get<SupplierOrderDto>(`${this.baseUrl}/orders/${id}`);
  }
  createOrder(order: CreateOrderDto) {
    return this.http.post<SupplierOrderDto>(`${this.baseUrl}/orders`, order);
  }
  updateOrder(id: string, order: CreateOrderDto) {
    return this.http.put<SupplierOrderDto>(
      `${this.baseUrl}/orders/${id}`,
      order
    );
  }
  deleteOrder(id: string) {
    return this.http.delete(`${this.baseUrl}/orders/${id}`);
  }

  // Stock Movements
  getStockMovements(): Observable<StockMovementDto[]> {
    return this.http.get<StockMovementDto[]>(`${this.baseUrl}/stock-movements`);
  }
}
