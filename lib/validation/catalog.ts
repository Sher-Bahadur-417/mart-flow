import { z } from "zod";

export const moneySchema = z
  .string()
  .trim()
  .or(z.number())
  .transform((value) => String(value))
  .refine((value) => !Number.isNaN(Number(value)), "Enter a valid amount.");

export const productSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  sku: z.string().trim().min(1, "SKU is required."),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  unitId: z.string().optional(),
  purchasePrice: moneySchema,
  sellingPrice: moneySchema,
  taxRate: moneySchema,
  discount: moneySchema,
  minStock: moneySchema,
  maxStock: z.string().optional(),
  barcode: z.string().trim().optional(),
  expiryDate: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
});

export const partySchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  phone: z.string().trim().optional(),
  email: z.string().trim().optional(),
  address: z.string().trim().optional(),
  openingBalance: moneySchema,
  creditLimit: z.string().optional(),
});

export const expenseSchema = z.object({
  categoryId: z.string().min(1),
  amount: moneySchema,
  date: z.string().min(1),
  method: z.enum(["CASH", "CARD", "CREDIT"]),
  description: z.string().optional(),
});
