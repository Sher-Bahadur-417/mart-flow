import { createProduct } from "@/lib/inventory/actions";
import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";
import { PageHeader, Field, NativeSelect } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "New product" };

export default async function NewProductPage() {
  const user = await requireStorePermission("products");
  const [categories, brands, units] = await Promise.all([
    prisma.category.findMany({ where: { storeId: user.storeId } }),
    prisma.brand.findMany({ where: { storeId: user.storeId } }),
    prisma.unit.findMany({ where: { storeId: user.storeId } }),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <PageHeader title="New product" description="Prices and stock are stored with Decimal precision." />
      <form action={createProduct} className="grid gap-3 sm:grid-cols-2">
        <Field label="Name">
          <Input name="name" required />
        </Field>
        <Field label="SKU">
          <Input name="sku" required />
        </Field>
        <Field label="Category">
          <NativeSelect name="categoryId">
            <option value="">None</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Brand">
          <NativeSelect name="brandId">
            <option value="">None</option>
            {brands.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Unit">
          <NativeSelect name="unitId">
            <option value="">None</option>
            {units.map((item) => (
              <option key={item.id} value={item.id}>
                {item.abbreviation}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Barcode">
          <Input name="barcode" />
        </Field>
        <Field label="Purchase price">
          <Input name="purchasePrice" type="number" step="0.01" required defaultValue="0" />
        </Field>
        <Field label="Selling price">
          <Input name="sellingPrice" type="number" step="0.01" required defaultValue="0" />
        </Field>
        <Field label="Tax %">
          <Input name="taxRate" type="number" step="0.01" defaultValue="0" />
        </Field>
        <Field label="Discount">
          <Input name="discount" type="number" step="0.01" defaultValue="0" />
        </Field>
        <Field label="Min stock">
          <Input name="minStock" type="number" step="0.001" defaultValue="0" />
        </Field>
        <Field label="Max stock">
          <Input name="maxStock" type="number" step="0.001" />
        </Field>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="isActive" defaultChecked /> Active
        </label>
        <Button type="submit" className="sm:col-span-2">
          Save product
        </Button>
      </form>
    </div>
  );
}
