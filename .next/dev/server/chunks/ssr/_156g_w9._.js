module.exports = [
"[project]/components/pos/pos-terminal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PosTerminal",
    ()=>PosTerminal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sales$2f$data$3a$f1a880__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/sales/data:f1a880 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sales$2f$data$3a$cca124__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/sales/data:cca124 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sales$2f$data$3a$d1121e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/sales/data:d1121e [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sales$2f$data$3a$3c3723__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/lib/sales/data:3c3723 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/utils/money.ts [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
;
;
;
function PosTerminal({ customers, heldCarts }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [hits, setHits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [customerId, setCustomerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [cash, setCash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [card, setCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [credit, setCredit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    const cartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(cart);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        cartRef.current = cart;
    }, [
        cart
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>{
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sales$2f$data$3a$3c3723__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["searchProductsAction"])(query).then(setHits).catch(()=>setHits([]));
        }, 150);
        return ()=>clearTimeout(timer);
    }, [
        query
    ]);
    const totals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const subtotal = cart.reduce((sum, line)=>sum + Number(line.sellingPrice) * line.quantity, 0);
        const discount = cart.reduce((sum, line)=>sum + line.lineDiscount * line.quantity, 0);
        const tax = cart.reduce((sum, line)=>{
            const net = (Number(line.sellingPrice) - line.lineDiscount) * line.quantity;
            return sum + net * Number(line.taxRate) / 100;
        }, 0);
        return {
            subtotal,
            discount,
            tax,
            total: subtotal - discount + tax
        };
    }, [
        cart
    ]);
    function addProduct(product) {
        setCart((current)=>{
            const existing = current.find((line)=>line.id === product.id);
            if (existing) {
                return current.map((line)=>line.id === product.id ? {
                        ...line,
                        quantity: line.quantity + 1
                    } : line);
            }
            return [
                ...current,
                {
                    ...product,
                    quantity: 1,
                    lineDiscount: Number(product.discount)
                }
            ];
        });
        setQuery("");
        document.getElementById("pos-search")?.focus();
    }
    async function holdCart() {
        if (cart.length === 0) {
            return;
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sales$2f$data$3a$cca124__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["holdCartAction"])({
            cart,
            customerId
        }, undefined, customerId || undefined);
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
        startTransition(async ()=>{
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sales$2f$data$3a$f1a880__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["completeSaleAction"])({
                    customerId: customerId || undefined,
                    items: cart.map((line)=>({
                            productId: line.id,
                            quantity: line.quantity,
                            discount: line.lineDiscount
                        })),
                    payments: [
                        {
                            method: "CASH",
                            amount: cashAmount
                        },
                        {
                            method: "CARD",
                            amount: cardAmount
                        },
                        {
                            method: "CREDIT",
                            amount: creditAmount
                        }
                    ]
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : "Checkout failed.");
            }
        });
    }
    async function resumeCart(id) {
        try {
            const held = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sales$2f$data$3a$d1121e__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["resumeHeldCartAction"])(id);
            const payload = held.payload;
            setCart(payload.cart ?? []);
            setCustomerId(payload.customerId ?? held.customerId ?? "");
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not resume cart.");
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function onKey(event) {
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
                setCart((current)=>current.slice(0, -1));
            }
        }
        window.addEventListener("keydown", onKey);
        return ()=>window.removeEventListener("keydown", onKey);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid flex-1 gap-4 p-4 lg:grid-cols-[1.2fr_0.8fr]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "pos-search",
                        value: query,
                        onChange: (event)=>setQuery(event.target.value),
                        placeholder: "F2 search name, SKU, or barcode",
                        className: "h-8 w-full rounded-lg border border-input px-2.5 text-sm",
                        onKeyDown: (event)=>{
                            if (event.key === "Enter" && hits[0]) {
                                event.preventDefault();
                                addProduct(hits[0]);
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/pos/pos-terminal.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid max-h-48 gap-1 overflow-auto rounded-lg border p-2",
                        children: hits.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted",
                                onClick: ()=>addProduct(product),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            product.name,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted-foreground",
                                                children: product.sku
                                            }, void 0, false, {
                                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                                lineNumber: 201,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                        lineNumber: 199,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(product.sellingPrice),
                                            " · ",
                                            product.stock
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, product.id, true, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/pos/pos-terminal.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-auto rounded-xl border",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-muted/50 text-left",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-2",
                                                children: "Item"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                                lineNumber: 213,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-2",
                                                children: "Qty"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                                lineNumber: 214,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-2",
                                                children: "Disc"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                                lineNumber: 215,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-2",
                                                children: "Total"
                                            }, void 0, false, {
                                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/pos/pos-terminal.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: cart.map((line)=>{
                                        const net = (Number(line.sellingPrice) - line.lineDiscount) * line.quantity;
                                        const tax = net * Number(line.taxRate) / 100;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-t",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-2",
                                                    children: line.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pos/pos-terminal.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                        className: "w-16",
                                                        type: "number",
                                                        min: 1,
                                                        value: line.quantity,
                                                        onChange: (event)=>setCart((current)=>current.map((item)=>item.id === line.id ? {
                                                                        ...item,
                                                                        quantity: Number(event.target.value)
                                                                    } : item))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pos/pos-terminal.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                        className: "w-20",
                                                        type: "number",
                                                        min: 0,
                                                        value: line.lineDiscount,
                                                        onChange: (event)=>setCart((current)=>current.map((item)=>item.id === line.id ? {
                                                                        ...item,
                                                                        lineDiscount: Number(event.target.value)
                                                                    } : item))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pos/pos-terminal.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-2",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(net + tax)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/pos/pos-terminal.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, line.id, true, {
                                            fileName: "[project]/components/pos/pos-terminal.tsx",
                                            lineNumber: 225,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/pos/pos-terminal.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/pos/pos-terminal.tsx",
                            lineNumber: 210,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/pos/pos-terminal.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/pos/pos-terminal.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "flex flex-col gap-3 rounded-xl border bg-card p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm font-medium",
                        htmlFor: "pos-customer",
                        children: "Customer (F4)"
                    }, void 0, false, {
                        fileName: "[project]/components/pos/pos-terminal.tsx",
                        lineNumber: 273,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "pos-customer",
                        className: "h-8 rounded-lg border border-input bg-transparent px-2 text-sm",
                        value: customerId,
                        onChange: (event)=>setCustomerId(event.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Walk-in"
                            }, void 0, false, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this),
                            customers.map((customer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: customer.id,
                                    children: customer.name
                                }, customer.id, false, {
                                    fileName: "[project]/components/pos/pos-terminal.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pos/pos-terminal.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Subtotal"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(totals.subtotal)
                                    }, void 0, false, {
                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                        lineNumber: 292,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Discount"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(totals.discount)
                                    }, void 0, false, {
                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                        lineNumber: 296,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Tax"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                        lineNumber: 299,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(totals.tax)
                                    }, void 0, false, {
                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-base font-semibold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total"
                                    }, void 0, false, {
                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                        lineNumber: 303,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(totals.total)
                                    }, void 0, false, {
                                        fileName: "[project]/components/pos/pos-terminal.tsx",
                                        lineNumber: 304,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pos/pos-terminal.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: "Cash",
                                value: cash,
                                onChange: (e)=>setCash(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 308,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: "Card",
                                value: card,
                                onChange: (e)=>setCard(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: "Credit",
                                value: credit,
                                onChange: (e)=>setCredit(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pos/pos-terminal.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-destructive",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/pos/pos-terminal.tsx",
                        lineNumber: 312,
                        columnNumber: 18
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: checkout,
                                disabled: pending || cart.length === 0,
                                children: pending ? "Saving..." : "Pay (F9)"
                            }, void 0, false, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: ()=>void holdCart(),
                                disabled: cart.length === 0,
                                children: "Hold (F8)"
                            }, void 0, false, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                onClick: ()=>setCart([]),
                                children: "Clear (Esc)"
                            }, void 0, false, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pos/pos-terminal.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this),
                    heldCarts.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Held carts"
                            }, void 0, false, {
                                fileName: "[project]/components/pos/pos-terminal.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this),
                            heldCarts.map((held)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    className: "w-full justify-start",
                                    onClick: ()=>void resumeCart(held.id),
                                    children: [
                                        "Resume ",
                                        held.label ?? "cart"
                                    ]
                                }, held.id, true, {
                                    fileName: "[project]/components/pos/pos-terminal.tsx",
                                    lineNumber: 328,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/pos/pos-terminal.tsx",
                        lineNumber: 325,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/pos/pos-terminal.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/pos/pos-terminal.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$input$2f$Input$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@base-ui/react/input/Input.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$base$2d$ui$2f$react$2f$input$2f$Input$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/lib/sales/data:3c3723 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "searchProductsAction",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"408574846a448efb054bc0b24f27bee45843314946":{"name":"searchProductsAction"}},"lib/sales/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("408574846a448efb054bc0b24f27bee45843314946", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "searchProductsAction");
;
}),
"[project]/lib/sales/data:cca124 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "holdCartAction",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"7019d33961fd6d4c504779779733870558808a25d7":{"name":"holdCartAction"}},"lib/sales/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7019d33961fd6d4c504779779733870558808a25d7", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "holdCartAction");
;
}),
"[project]/lib/sales/data:d1121e [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resumeHeldCartAction",
    ()=>$$RSC_SERVER_ACTION_4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"405fa45ae2ba0065923c69706f8b91d585cab5d0d6":{"name":"resumeHeldCartAction"}},"lib/sales/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("405fa45ae2ba0065923c69706f8b91d585cab5d0d6", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "resumeHeldCartAction");
;
}),
"[project]/lib/sales/data:f1a880 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "completeSaleAction",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"406e67d8f8e425712c60482fa04a6ed5c1edff9f0e":{"name":"completeSaleAction"}},"lib/sales/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("406e67d8f8e425712c60482fa04a6ed5c1edff9f0e", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "completeSaleAction");
;
}),
"[project]/lib/utils/decimal.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Decimal",
    ()=>Decimal
]);
const SCALE = 6;
const ZERO = BigInt(0);
const TEN = BigInt(10);
const FACTOR = TEN ** BigInt(SCALE);
function parseUnits(value) {
    if (value instanceof Decimal) {
        return value.units;
    }
    const text = String(value).trim();
    if (!text) {
        return ZERO;
    }
    const negative = text.startsWith("-");
    const raw = negative ? text.slice(1) : text;
    const [wholePart, fractionPart = ""] = raw.split(".");
    const whole = BigInt(wholePart || "0");
    const fraction = BigInt((fractionPart + "0".repeat(SCALE)).slice(0, SCALE));
    const units = whole * FACTOR + fraction;
    return negative ? ZERO - units : units;
}
function roundHalfUp(units, places) {
    const drop = SCALE - places;
    if (drop <= 0) {
        return units;
    }
    const factor = TEN ** BigInt(drop);
    const half = factor / BigInt(2);
    if (units >= ZERO) {
        return (units + half) / factor * factor;
    }
    return (units - half) / factor * factor;
}
function formatUnits(units, places) {
    const rounded = roundHalfUp(units, places);
    const negative = rounded < ZERO;
    const absolute = negative ? ZERO - rounded : rounded;
    const asString = absolute.toString().padStart(SCALE + 1, "0");
    const whole = asString.slice(0, -SCALE) || "0";
    const fraction = asString.slice(-SCALE).slice(0, places);
    const body = places > 0 ? `${whole}.${fraction}` : whole;
    return negative ? `-${body}` : body;
}
class Decimal {
    units;
    constructor(value = 0){
        if (typeof value === "object" && value !== null && "__units" in value) {
            this.units = value.__units;
            return;
        }
        this.units = parseUnits(value);
    }
    static fromUnits(units) {
        return new Decimal({
            __units: units
        });
    }
    plus(value) {
        return Decimal.fromUnits(this.units + parseUnits(value));
    }
    minus(value) {
        return Decimal.fromUnits(this.units - parseUnits(value));
    }
    times(value) {
        return Decimal.fromUnits(this.units * parseUnits(value) / FACTOR);
    }
    dividedBy(value) {
        const divisor = parseUnits(value);
        if (divisor === ZERO) {
            throw new Error("Division by zero.");
        }
        return Decimal.fromUnits(this.units * FACTOR / divisor);
    }
    negated() {
        return Decimal.fromUnits(-this.units);
    }
    toDecimalPlaces(places) {
        return Decimal.fromUnits(roundHalfUp(this.units, places));
    }
    cmp(value) {
        const other = parseUnits(value);
        if (this.units < other) return -1;
        if (this.units > other) return 1;
        return 0;
    }
    gt(value) {
        return this.cmp(value) > 0;
    }
    gte(value) {
        return this.cmp(value) >= 0;
    }
    lt(value) {
        return this.cmp(value) < 0;
    }
    lte(value) {
        return this.cmp(value) <= 0;
    }
    eq(value) {
        return this.cmp(value) === 0;
    }
    equals(value) {
        return this.eq(value);
    }
    isZero() {
        return this.units === ZERO;
    }
    toFixed(places) {
        return formatUnits(this.units, places);
    }
    toString() {
        return formatUnits(this.units, SCALE).replace(/\.?0+$/, "") || "0";
    }
}
}),
"[project]/lib/utils/money.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatMoney",
    ()=>formatMoney,
    "moneyZero",
    ()=>moneyZero,
    "qtyZero",
    ()=>qtyZero,
    "slugify",
    ()=>slugify,
    "sumMoney",
    ()=>sumMoney,
    "toMoney",
    ()=>toMoney,
    "toQty",
    ()=>toQty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/decimal.ts [app-ssr] (ecmascript)");
;
;
const moneyZero = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Decimal"](0);
const qtyZero = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Decimal"](0);
function toMoney(value) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Decimal"](value).toDecimalPlaces(2);
}
function toQty(value) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Decimal"](value).toDecimalPlaces(3);
}
function sumMoney(values) {
    return values.reduce((total, value)=>total.plus(value), moneyZero);
}
function formatMoney(value, currency = "Rs") {
    return `${currency} ${toMoney(value).toFixed(2)}`;
}
function slugify(value) {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
}),
];

//# sourceMappingURL=_156g_w9._.js.map