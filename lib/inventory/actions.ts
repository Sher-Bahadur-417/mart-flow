"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { writeAuditLog } from "@/lib/auth/audit";
import { collections, FieldValue, newId } from "@/lib/data/fs";
import { getProduct, listProducts } from "@/lib/data/queries";
import { firestore } from "@/lib/firebase-admin";
import {
  createProductInventoryWrites,
  readInventoryInTx,
  writeStockChange,
} from "@/lib/inventory";
import { requireStorePermission } from "@/lib/permissions";
import { slugify, toMoney, toQty } from "@/lib/utils/money";
import { categorySchema, productSchema } from "@/lib/validation/catalog";

function optionalId(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text ? text : undefined;
}

function barcodeDocId(storeId: string, code: string) {
  return `${storeId}_${code}`;
}

export async function createCategory(formData: FormData) {
  const user = await requireStorePermission("products");
  const parsed = categorySchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid category.");
  }

  const slug = slugify(parsed.data.name) || `cat-${Date.now()}`;
  const id = newId(collections.categories);
  const now = FieldValue.serverTimestamp();
  await firestore.collection(collections.categories).doc(id).set({
    id,
    storeId: user.storeId,
    name: parsed.data.name,
    slug,
    isActive: true,
    createdAt: now,
    updatedAt: now,
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
  const sku = data.sku.trim().toUpperCase();
  const existing = (await listProducts(user.storeId)).find((row) => row.sku === sku);
  if (existing) {
    throw new Error("That SKU is already in use.");
  }

  const barcode = data.barcode?.trim() || "";
  const productId = newId(collections.products);
  const barcodes = barcode ? [barcode] : [];

  await firestore.runTransaction(async (tx) => {
    if (barcode) {
      const barcodeSnap = await tx.get(
        firestore.collection(collections.productBarcodes).doc(barcodeDocId(user.storeId, barcode)),
      );
      if (barcodeSnap.exists) {
        throw new Error("That barcode is already in use.");
      }
    }

    const now = FieldValue.serverTimestamp();
    tx.set(firestore.collection(collections.products).doc(productId), {
      id: productId,
      storeId: user.storeId,
      name: data.name,
      sku,
      categoryId: data.categoryId ?? null,
      brandId: data.brandId ?? null,
      unitId: data.unitId ?? null,
      purchasePrice: toMoney(data.purchasePrice).toString(),
      sellingPrice: toMoney(data.sellingPrice).toString(),
      taxRate: toMoney(data.taxRate).toString(),
      discount: toMoney(data.discount).toString(),
      minStock: toQty(data.minStock).toString(),
      maxStock: data.maxStock ? toQty(data.maxStock).toString() : null,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      imageUrl: null,
      isActive: data.isActive,
      barcodes,
      createdAt: now,
      updatedAt: now,
    });
    createProductInventoryWrites(tx, {
      storeId: user.storeId,
      productId,
    });
    if (barcode) {
      const barcodeId = barcodeDocId(user.storeId, barcode);
      tx.set(firestore.collection(collections.productBarcodes).doc(barcodeId), {
        id: barcodeId,
        storeId: user.storeId,
        productId,
        code: barcode,
      });
    }
  });

  await writeAuditLog({
    action: "PRODUCT_CREATE",
    entity: "Product",
    entityId: productId,
    userId: user.id,
    storeId: user.storeId,
    metadata: { sku, sellingPrice: toMoney(data.sellingPrice).toString() },
  });
  revalidatePath("/products");
  redirect("/products");
}

export async function updateProduct(productId: string, formData: FormData) {
  const user = await requireStorePermission("products");
  const existing = await getProduct(productId);
  if (!existing || existing.storeId !== user.storeId) {
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
  const sku = data.sku.trim().toUpperCase();
  const skuTaken = (await listProducts(user.storeId)).find(
    (row) => row.sku === sku && row.id !== productId,
  );
  if (skuTaken) {
    throw new Error("That SKU is already in use.");
  }

  const priceChanged =
    !existing.sellingPrice.equals(toMoney(data.sellingPrice)) ||
    !existing.purchasePrice.equals(toMoney(data.purchasePrice));
  const barcode = data.barcode?.trim() || "";

  await firestore.runTransaction(async (tx) => {
    if (barcode) {
      const barcodeSnap = await tx.get(
        firestore.collection(collections.productBarcodes).doc(barcodeDocId(user.storeId, barcode)),
      );
      if (barcodeSnap.exists && String(barcodeSnap.data()?.productId ?? "") !== productId) {
        throw new Error("That barcode is already in use.");
      }
    }

    const barcodes = barcode
      ? Array.from(new Set([...existing.barcodes, barcode]))
      : existing.barcodes;

    tx.set(
      firestore.collection(collections.products).doc(productId),
      {
        name: data.name,
        sku,
        categoryId: data.categoryId ?? null,
        brandId: data.brandId ?? null,
        unitId: data.unitId ?? null,
        purchasePrice: toMoney(data.purchasePrice).toString(),
        sellingPrice: toMoney(data.sellingPrice).toString(),
        taxRate: toMoney(data.taxRate).toString(),
        discount: toMoney(data.discount).toString(),
        minStock: toQty(data.minStock).toString(),
        maxStock: data.maxStock ? toQty(data.maxStock).toString() : null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        isActive: data.isActive,
        barcodes,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    if (barcode) {
      const barcodeId = barcodeDocId(user.storeId, barcode);
      tx.set(firestore.collection(collections.productBarcodes).doc(barcodeId), {
        id: barcodeId,
        storeId: user.storeId,
        productId,
        code: barcode,
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

  await firestore.runTransaction(async (tx) => {
    const inventory = await readInventoryInTx(tx, user.storeId, productId);
    const delta = quantityAfter.minus(inventory.quantity);
    if (delta.isZero()) {
      return;
    }
    writeStockChange(
      tx,
      {
        storeId: user.storeId,
        productId,
        type: "ADJUSTMENT",
        quantityDelta: delta,
        userId: user.id,
        reason,
        referenceType: "StockAdjustment",
        allowNegative: true,
      },
      inventory.quantity,
    );
    const adjustmentId = newId(collections.stockAdjustments);
    tx.set(firestore.collection(collections.stockAdjustments).doc(adjustmentId), {
      id: adjustmentId,
      storeId: user.storeId,
      productId,
      quantityBefore: inventory.quantity.toString(),
      quantityAfter: quantityAfter.toString(),
      reason,
      createdById: user.id,
      createdAt: FieldValue.serverTimestamp(),
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

  await firestore.runTransaction(async (tx) => {
    const inventory = await readInventoryInTx(tx, user.storeId, productId);
    writeStockChange(
      tx,
      {
        storeId: user.storeId,
        productId,
        type: "DAMAGE",
        quantityDelta: quantity.negated(),
        userId: user.id,
        reason,
        referenceType: "Damage",
      },
      inventory.quantity,
    );
  });
  revalidatePath("/inventory");
}
