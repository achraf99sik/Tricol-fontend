export interface OrderProduct {
  quantity: number;
  productId: string; // UUID
}

export interface CreateOrderDto {
  supplier: string; // UUID
  products: OrderProduct[];
}

export interface ProductDto {
  id?: string; // UUID
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  category?: string;
  createdAt?: string; // ISO string
}

export interface StockMovementDto {
  id: string;
  date: string; // ISO string
  quantity: number | string; // your backend uses String sometimes
  type: 'ENTREE' | 'SORTIE' | 'AJUSTEMENT';
  supplierOrderId: string;
  createdAt?: string;
}

export interface SupplierOrderDto {
  id: string;
  orderDate: string; // ISO string
  status: 'EN_ATTENTE' | 'VALIDÉE' | 'LIVRÉE' | 'ANNULÉE';
  totalAmount: number | string;
  supplierId: string;
  products: ProductDto[];
  stockMovements: StockMovementDto[];
  createdAt?: string;
}

export interface SupplierDto {
  id?: string;
  company: string;
  address?: string;
  contact?: string;
  email?: string;
  phone?: string;
  city?: string;
  ice?: number;
  createdAt?: string;
  orders?: SupplierOrderDto[];
}
