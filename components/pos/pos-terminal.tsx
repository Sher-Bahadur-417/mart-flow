"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  completeSaleAction,
  holdCartAction,
  resumeHeldCartAction,
  searchProductsAction,
} from "@/lib/sales/actions";
import { formatMoney } from "@/lib/utils/money";

type ProductHit = Awaited<ReturnType<typeof searchProductsAction>>[number];
type CartLine = ProductHit & { quantity: number; lineDiscount: number };
type CustomerOption = { id: string; name: string; phone: string | null };

export function PosTerminal({
  customers,
  heldCarts,
}: {
  customers: CustomerOption[];
  heldCarts: { id: string; label: string | null }[];
}) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<ProductHit[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [cash, setCash] = useState("");
  const [card, setCard] = useState("");
  const [credit, setCredit] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const cartRef = useRef(cart);

  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void searchProductsAction(query).then(setHits).catch(() => setHits([]));
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, line) => sum + Number(line.sellingPrice) * line.quantity,
      0,
    );
    const discount = cart.reduce(
      (sum, line) => sum + line.lineDiscount * line.quantity,
      0,
    );
    const tax = cart.reduce((sum, line) => {
      const net = (Number(line.sellingPrice) - line.lineDiscount) * line.quantity;
      return sum + (net * Number(line.taxRate)) / 100;
    }, 0);
    return {
      subtotal,
      discount,
      tax,
      total: subtotal - discount + tax,
    };
  }, [cart]);

  function addProduct(product: ProductHit) {
    setCart((current) => {
      const existing = current.find((line) => line.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.id === product.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }
      return [
        ...current,
        {
          ...product,
          quantity: 1,
          lineDiscount: Number(product.discount),
        },
      ];
    });
    setQuery("");
    document.getElementById("pos-search")?.focus();
  }

  async function holdCart() {
    if (cart.length === 0) {
      return;
    }
    await holdCartAction({ cart, customerId }, undefined, customerId || undefined);
    setCart([]);
  }

  function checkout() {
    setError(null);
    const cashAmount = Number(cash || 0);
    const cardAmount = Number(card || 0);
    const creditAmount = Number(credit || 0);
    const paid = cashAmount + cardAmount + creditAmount;
    if (Math.abs(paid - totals.total) > 0.009) {
      setError("Cash + card + credit must equal the total.");
      return;
    }
    startTransition(async () => {
      try {
        await completeSaleAction({
          customerId: customerId || undefined,
          items: cart.map((line) => ({
            productId: line.id,
            quantity: line.quantity,
            discount: line.lineDiscount,
          })),
          payments: [
            { method: "CASH", amount: cashAmount },
            { method: "CARD", amount: cardAmount },
            { method: "CREDIT", amount: creditAmount },
          ],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Checkout failed.");
      }
    });
  }

  async function resumeCart(id: string) {
    try {
      const held = await resumeHeldCartAction(id);
      const payload = held.payload as { cart?: CartLine[]; customerId?: string };
      setCart(payload.cart ?? []);
      setCustomerId(payload.customerId ?? held.customerId ?? "");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resume cart.");
    }
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "F2") {
        event.preventDefault();
        document.getElementById("pos-search")?.focus();
      }
      if (event.key === "F4") {
        event.preventDefault();
        document.getElementById("pos-customer")?.focus();
      }
      if (event.key === "F8") {
        event.preventDefault();
        void holdCart();
      }
      if (event.key === "F9") {
        event.preventDefault();
        checkout();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setCart([]);
        setError(null);
      }
      if (event.key === "Delete" && cartRef.current.length > 0) {
        event.preventDefault();
        setCart((current) => current.slice(0, -1));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="grid flex-1 gap-4 p-4 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="flex flex-col gap-3">
        <input
          id="pos-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="F2 search name, SKU, or barcode"
          className="h-8 w-full rounded-lg border border-input px-2.5 text-sm"
          onKeyDown={(event) => {
            if (event.key === "Enter" && hits[0]) {
              event.preventDefault();
              addProduct(hits[0]);
            }
          }}
        />
        <div className="grid max-h-48 gap-1 overflow-auto rounded-lg border p-2">
          {hits.map((product) => (
            <button
              key={product.id}
              type="button"
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
              onClick={() => addProduct(product)}
            >
              <span>
                {product.name}{" "}
                <span className="text-muted-foreground">{product.sku}</span>
              </span>
              <span>
                {formatMoney(product.sellingPrice)} · {product.stock}
              </span>
            </button>
          ))}
        </div>
        <div className="overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-2">Item</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Disc</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((line) => {
                const net =
                  (Number(line.sellingPrice) - line.lineDiscount) * line.quantity;
                const tax = (net * Number(line.taxRate)) / 100;
                return (
                  <tr key={line.id} className="border-t">
                    <td className="p-2">{line.name}</td>
                    <td className="p-2">
                      <Input
                        className="w-16"
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={(event) =>
                          setCart((current) =>
                            current.map((item) =>
                              item.id === line.id
                                ? { ...item, quantity: Number(event.target.value) }
                                : item,
                            ),
                          )
                        }
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        className="w-20"
                        type="number"
                        min={0}
                        value={line.lineDiscount}
                        onChange={(event) =>
                          setCart((current) =>
                            current.map((item) =>
                              item.id === line.id
                                ? {
                                    ...item,
                                    lineDiscount: Number(event.target.value),
                                  }
                                : item,
                            ),
                          )
                        }
                      />
                    </td>
                    <td className="p-2">{formatMoney(net + tax)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <aside className="flex flex-col gap-3 rounded-xl border bg-card p-4">
        <label className="text-sm font-medium" htmlFor="pos-customer">
          Customer (F4)
        </label>
        <select
          id="pos-customer"
          className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
          value={customerId}
          onChange={(event) => setCustomerId(event.target.value)}
        >
          <option value="">Walk-in</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatMoney(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>{formatMoney(totals.discount)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{formatMoney(totals.tax)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>{formatMoney(totals.total)}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Input placeholder="Cash" value={cash} onChange={(e) => setCash(e.target.value)} />
          <Input placeholder="Card" value={card} onChange={(e) => setCard(e.target.value)} />
          <Input placeholder="Credit" value={credit} onChange={(e) => setCredit(e.target.value)} />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <div className="mt-auto flex flex-col gap-2">
          <Button onClick={checkout} disabled={pending || cart.length === 0}>
            {pending ? "Saving..." : "Pay (F9)"}
          </Button>
          <Button variant="outline" onClick={() => void holdCart()} disabled={cart.length === 0}>
            Hold (F8)
          </Button>
          <Button variant="ghost" onClick={() => setCart([])}>
            Clear (Esc)
          </Button>
        </div>
        {heldCarts.length > 0 ? (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Held carts</p>
            {heldCarts.map((held) => (
              <Button
                key={held.id}
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => void resumeCart(held.id)}
              >
                Resume {held.label ?? "cart"}
              </Button>
            ))}
          </div>
        ) : null}
      </aside>
    </div>
  );
}
