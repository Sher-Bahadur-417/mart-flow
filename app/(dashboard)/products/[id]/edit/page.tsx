import { updateProduct } from "@/lib/inventory/actions";
import { getProductWithRelations, listBrands, listCategories, listUnits } from "@/lib/data/queries";
import { requireStorePermission } from "@/lib/permissions";
import { PageHeader, Field, NativeSelect } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit product" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireStorePermission("products");
  const { id } = await params;
  const [product, categories, brands, units] = await Promise.all([
    getProductWithRelations(user.storeId, id),
    listCategories(user.storeId),
    listBrands(user.storeId),
    listUnits(user.storeId),
  ]);
  if (!product) {
    notFound();
  }
  const action = updateProduct.bind(null, product.id);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <PageHeader title={`Edit ${product.name}`} />
      <form action={action} className="grid gap-3 sm:grid-cols-2">
        <Field label="Name">
          <Input name="name" required defaultValue={product.name} />
        </Field>
        <Field label="SKU">
          <Input name="sku" required defaultValue={product.sku} />
        </Field>
        <Field label="Category">
          <NativeSelect name="categoryId" defaultValue={product.categoryId ?? ""}>
            <option value="">None</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Brand">
          <NativeSelect name="brandId" defaultValue={product.brandId ?? ""}>
            <option value="">None</option>
            {brands.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Unit">
          <NativeSelect name="unitId" defaultValue={product.unitId ?? ""}>
            <option value="">None</option>
            {units.map((item) => (
              <option key={item.id} value={item.id}>
                {item.abbreviation}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Barcode">
          <Input name="barcode" defaultValue={product.barcodes[0]?.code ?? ""} />
        </Field>
        <Field label="Purchase price">
          <Input name="purchasePrice" type="number" step="0.01" defaultValue={product.purchasePrice.toString()} />
        </Field>
        <Field label="Selling price">
          <Input name="sellingPrice" type="number" step="0.01" defaultValue={product.sellingPrice.toString()} />
        </Field>
        <Field label="Tax %">
          <Input name="taxRate" type="number" step="0.01" defaultValue={product.taxRate.toString()} />
        </Field>
        <Field label="Discount">
          <Input name="discount" type="number" step="0.01" defaultValue={product.discount.toString()} />
        </Field>
        <Field label="Min stock">
          <Input name="minStock" type="number" step="0.001" defaultValue={product.minStock.toString()} />
        </Field>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="isActive" defaultChecked={product.isActive} /> Active
        </label>
        <Button type="submit" className="sm:col-span-2">
          Save changes
        </Button>
      </form>
    </div>
  );
}
