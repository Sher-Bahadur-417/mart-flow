"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { writeAuditLog } from "@/lib/auth/audit";
import { prisma } from "@/lib/db";
import { createProductInventory } from "@/lib/inventory";
import { requireStorePermission } from "@/lib/permissions";
import { toMoney, toQty, slugify } from "@/lib/utils/money";
import { productSchema, categorySchema } from "@/lib/validation/catalog";

function optionalId(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text ? text : undefined;
}

export async function createCategory(formData: FormData) {
  const user = await requireStorePermission("products");
  const parsed = categorySchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid category.");
  }

  const slug = slugify(parsed.data.name) || `cat-${Date.now()}`;
  await prisma.category.create({
    data: {
      storeId: user.storeId,
      name: parsed.data.name,
      slug,
    },
  });
  await writeAuditLog({
    action: "CATEGORY_CREATE",
    entity: "Category",
    userId: user.id,
    storeId: user.storeId,
    metadata: { name: parsed.data.name },
  });
  revalidatePath("/categories");
  redirect("/categories");
}

export async function createProduct(formData: FormData) {
  const user = await requireStorePermission("products");
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    sku: formData.get("sku"),
    categoryId: optionalId(formData.get("categoryId")),
    brandId: optionalId(formData.get("brandId")),
    unitId: optionalId(formData.get("unitId")),
    purchasePrice: formData.get("purchasePrice"),
    sellingPrice: formData.get("sellingPrice"),
    taxRate: formData.get("taxRate") ?? "0",
    discount: formData.get("discount") ?? "0",
    minStock: formData.get("minStock") ?? "0",
    maxStock: String(formData.get("maxStock") ?? ""),
    barcode: formData.get("barcode"),
    expiryDate: formData.get("expiryDate"),
    isActive: formData.get("isActive") === "on",
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid product.");
  }

  const data = parsed.data;
  const product = await prisma.$transaction(async (tx) => {
    const created = await tx.product.create({
      data: {
        storeId: user.storeId,
        name: data.name,
        sku: data.sku.trim().toUpperCase(),
        categoryId: data.categoryId,
        brandId: data.brandId,
        unitId: data.unitId,
        purchasePrice: toMoney(data.purchasePrice),
        sellingPrice: toMoney(data.sellingPrice),
        taxRate: toMoney(data.taxRate),
        discount: toMoney(data.discount),
        minStock: toQty(data.minStock),
        maxStock: data.maxStock ? toQty(data.maxStock) : null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        isActive: data.isActive,
      },
    });
    await createProductInventory(tx, {
      storeId: user.storeId,
      productId: created.id,
    });
    const barcode = data.barcode?.trim();
    if (barcode) {
      await tx.productBarcode.create({
        data: { storeId: user.storeId, productId: created.id, code: barcode },
      });
    }
    return created;
  });

  await writeAuditLog({
    action: "PRODUCT_CREATE",
    entity: "Product",
    entityId: product.id,
    userId: user.id,
    storeId: user.storeId,
    metadata: { sku: product.sku, sellingPrice: product.sellingPrice.toString() },
  });
  revalidatePath("/products");
  redirect("/products");
}

export async function updateProduct(productId: string, formData: FormData) {
  const user = await requireStorePermission("products");
  const existing = await prisma.product.findFirst({
    where: { id: productId, storeId: user.storeId },
  });
  if (!existing) {
    throw new Error("Product not found.");
  }

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    sku: formData.get("sku"),
    categoryId: optionalId(formData.get("categoryId")),
    brandId: optionalId(formData.get("brandId")),
    unitId: optionalId(formData.get("unitId")),
    purchasePrice: formData.get("purchasePrice"),
    sellingPrice: formData.get("sellingPrice"),
    taxRate: formData.get("taxRate") ?? "0",
    discount: formData.get("discount") ?? "0",
    minStock: formData.get("minStock") ?? "0",
    maxStock: String(formData.get("maxStock") ?? ""),
    barcode: formData.get("barcode"),
    expiryDate: formData.get("expiryDate"),
    isActive: formData.get("isActive") === "on",
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid product.");
  }

  const data = parsed.data;
  const priceChanged =
    !existing.sellingPrice.equals(toMoney(data.sellingPrice)) ||
    !existing.purchasePrice.equals(toMoney(data.purchasePrice));

  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        sku: data.sku.trim().toUpperCase(),
        categoryId: data.categoryId ?? null,
        brandId: data.brandId ?? null,
        unitId: data.unitId ?? null,
        purchasePrice: toMoney(data.purchasePrice),
        sellingPrice: toMoney(data.sellingPrice),
        taxRate: toMoney(data.taxRate),
        discount: toMoney(data.discount),
        minStock: toQty(data.minStock),
        maxStock: data.maxStock ? toQty(data.maxStock) : null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        isActive: data.isActive,
      },
    });
    const barcode = data.barcode?.trim();
    if (barcode) {
      await tx.productBarcode.upsert({
        where: { storeId_code: { storeId: user.storeId, code: barcode } },
        update: { productId },
        create: { storeId: user.storeId, productId, code: barcode },
      });
    }
  });

  if (priceChanged) {
    await writeAuditLog({
      action: "PRODUCT_PRICE_CHANGE",
      entity: "Product",
      entityId: productId,
      userId: user.id,
      storeId: user.storeId,
      metadata: {
        from: {
          purchasePrice: existing.purchasePrice.toString(),
          sellingPrice: existing.sellingPrice.toString(),
        },
        to: {
          purchasePrice: toMoney(data.purchasePrice).toString(),
          sellingPrice: toMoney(data.sellingPrice).toString(),
        },
      },
    });
  }

  revalidatePath("/products");
  redirect(`/products/${productId}`);
}

export async function adjustStock(formData: FormData) {
  const user = await requireStorePermission("inventory");
  const productId = String(formData.get("productId") ?? "");
  const quantityAfter = toQty(String(formData.get("quantity") ?? "0"));
  const reason = String(formData.get("reason") ?? "").trim();
  if (!reason) {
    throw new Error("Adjustment reason is required.");
  }

  await prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findFirst({
      where: { productId, storeId: user.storeId },
    });
    if (!inventory) {
      throw new Error("Inventory not found.");
    }
    const delta = quantityAfter.minus(inventory.quantity);
    if (delta.isZero()) {
      return;
    }
    const { applyStockChange } = await import("@/lib/inventory");
    await applyStockChange(tx, {
      storeId: user.storeId,
      productId,
      type: "ADJUSTMENT",
      quantityDelta: delta,
      userId: user.id,
      reason,
      referenceType: "StockAdjustment",
      allowNegative: true,
    });
    await tx.stockAdjustment.create({
      data: {
        storeId: user.storeId,
        productId,
        quantityBefore: inventory.quantity,
        quantityAfter,
        reason,
        createdById: user.id,
      },
    });
  });

  await writeAuditLog({
    action: "STOCK_ADJUSTMENT",
    entity: "Inventory",
    entityId: productId,
    userId: user.id,
    storeId: user.storeId,
    metadata: { quantityAfter: quantityAfter.toString(), reason },
  });
  revalidatePath("/inventory");
}

export async function recordDamage(formData: FormData) {
  const user = await requireStorePermission("inventory");
  const productId = String(formData.get("productId") ?? "");
  const quantity = toQty(String(formData.get("quantity") ?? "0"));
  const reason = String(formData.get("reason") ?? "Damage").trim();
  if (quantity.lte(0)) {
    throw new Error("Quantity must be greater than zero.");
  }

  const { applyStockChange } = await import("@/lib/inventory");
  await prisma.$transaction(async (tx) => {
    await applyStockChange(tx, {
      storeId: user.storeId,
      productId,
      type: "DAMAGE",
      quantityDelta: quantity.negated(),
      userId: user.id,
      reason,
      referenceType: "Damage",
    });
  });
  revalidatePath("/inventory");
}
