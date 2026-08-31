import type { Decimal } from "@/lib/utils/decimal";

export type PaymentMethod = "CASH" | "CARD" | "MIXED" | "CREDIT" | "STORE_CREDIT";
export type SaleStatus = "COMPLETED" | "RETURNED" | "PARTIALLY_RETURNED" | "CANCELLED";
export type PurchaseStatus = "DRAFT" | "ORDERED" | "RECEIVED" | "COMPLETED";
export type InventoryMovementType =
  | "PURCHASE"
  | "SALE"
  | "RETURN"
  | "DAMAGE"
  | "LOSS"
  | "ADJUSTMENT";
export type RefundMethod = "CASH" | "CARD" | "STORE_CREDIT";

export type StoreDoc = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type RoleDoc = {
  id: string;
  code: string;
  name: string;
  description: string | null;
};

export type UserDoc = {
  id: string;
  storeId: string | null;
  roleId: string;
  roleCode: string;
  roleName: string;
  name: string;
  email: string;
  username: string;
  phone: string | null;
  permissions: string[];
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type EmployeeDoc = {
  id: string;
  storeId: string;
  userId: string;
  employeeCode: string;
  phone: string | null;
  jobTitle: string | null;
  hireDate: Date | null;
  salary: Decimal | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SettingDoc = {
  id: string;
  storeId: string;
  key: string;
  value: string;
};

export type UnitDoc = {
  id: string;
  storeId: string;
  name: string;
  abbreviation: string;
};

export type CategoryDoc = {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type BrandDoc = {
  id: string;
  storeId: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductBarcodeDoc = {
  id: string;
  storeId: string;
  productId: string;
  code: string;
};

export type ProductDoc = {
  id: string;
  storeId: string;
  name: string;
  sku: string;
  categoryId: string | null;
  brandId: string | null;
  unitId: string | null;
  purchasePrice: Decimal;
  sellingPrice: Decimal;
  taxRate: Decimal;
  discount: Decimal;
  minStock: Decimal;
  maxStock: Decimal | null;
  expiryDate: Date | null;
  imageUrl: string | null;
  isActive: boolean;
  barcodes: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type InventoryDoc = {
  id: string;
  storeId: string;
  productId: string;
  quantity: Decimal;
  updatedAt: Date;
};

export type CustomerDoc = {
  id: string;
  storeId: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  openingBalance: Decimal;
  creditLimit: Decimal | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CustomerPaymentDoc = {
  id: string;
  storeId: string;
  customerId: string;
  amount: Decimal;
  method: PaymentMethod;
  note: string | null;
  createdById: string;
  createdAt: Date;
};

export type SupplierDoc = {
  id: string;
  storeId: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  openingBalance: Decimal;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SupplierPaymentDoc = {
  id: string;
  storeId: string;
  supplierId: string;
  amount: Decimal;
  method: PaymentMethod;
  note: string | null;
  createdById: string;
  createdAt: Date;
};

export type SaleItemDoc = {
  id: string;
  productId: string;
  name: string;
  sku: string;
  quantity: Decimal;
  unitPrice: Decimal;
  costPrice: Decimal;
  discount: Decimal;
  tax: Decimal;
  lineTotal: Decimal;
};

export type SalePaymentDoc = {
  id: string;
  method: PaymentMethod;
  amount: Decimal;
};

export type SaleDoc = {
  id: string;
  storeId: string;
  invoiceNumber: string;
  cashierId: string;
  cashierName: string;
  customerId: string | null;
  customerName: string | null;
  status: SaleStatus;
  subtotal: Decimal;
  discountTotal: Decimal;
  taxTotal: Decimal;
  total: Decimal;
  paidAmount: Decimal;
  creditAmount: Decimal;
  note: string | null;
  items: SaleItemDoc[];
  payments: SalePaymentDoc[];
  createdAt: Date;
};

export type HeldCartDoc = {
  id: string;
  storeId: string;
  cashierId: string;
  customerId: string | null;
  label: string | null;
  payload: unknown;
  createdAt: Date;
};

export type ReturnItemDoc = {
  id: string;
  saleItemId: string;
  productId: string;
  quantity: Decimal;
  unitPrice: Decimal;
  lineTotal: Decimal;
};

export type RefundDoc = {
  id: string;
  method: RefundMethod;
  amount: Decimal;
};

export type ReturnDoc = {
  id: string;
  storeId: string;
  saleId: string;
  invoiceNumber: string;
  cashierId: string;
  cashierName: string;
  customerId: string | null;
  total: Decimal;
  note: string | null;
  items: ReturnItemDoc[];
  refunds: RefundDoc[];
  createdAt: Date;
};

export type PurchaseItemDoc = {
  id: string;
  productId: string;
  productName: string;
  quantityOrdered: Decimal;
  quantityReceived: Decimal;
  unitCost: Decimal;
  lineTotal: Decimal;
};

export type PurchaseDoc = {
  id: string;
  storeId: string;
  supplierId: string;
  supplierName: string;
  number: string;
  status: PurchaseStatus;
  subtotal: Decimal;
  total: Decimal;
  note: string | null;
  orderedAt: Date | null;
  receivedAt: Date | null;
  createdById: string;
  items: PurchaseItemDoc[];
  createdAt: Date;
  updatedAt: Date;
};

export type ExpenseCategoryDoc = {
  id: string;
  storeId: string;
  name: string;
};

export type ExpenseDoc = {
  id: string;
  storeId: string;
  categoryId: string;
  categoryName: string;
  amount: Decimal;
  date: Date;
  method: PaymentMethod;
  description: string | null;
  createdById: string;
  createdByName: string;
  createdAt: Date;
};

export type NotificationDoc = {
  id: string;
  storeId: string;
  userId: string | null;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: Date;
};

export type AuditLogDoc = {
  id: string;
  storeId: string | null;
  userId: string | null;
  userName: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
};

export type ProductWithRelations = Omit<ProductDoc, "barcodes"> & {
  inventory: InventoryDoc | null;
  category: Pick<CategoryDoc, "id" | "name"> | null;
  brand: Pick<BrandDoc, "id" | "name"> | null;
  unit: Pick<UnitDoc, "id" | "name" | "abbreviation"> | null;
  barcodes: ProductBarcodeDoc[];
};
