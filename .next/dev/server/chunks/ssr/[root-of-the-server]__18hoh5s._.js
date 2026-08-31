module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/(dashboard)/dashboard/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "default",
    ()=>DashboardPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$page$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/page-header.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$sales$2d$trend$2d$chart$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/reports/sales-trend-chart.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/store.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/data/queries.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$reports$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/reports/queries.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/utils/money.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$reports$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$reports$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
const metadata = {
    title: "Dashboard"
};
async function DashboardPage() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireStoreUser"])();
    const [metrics, trend, notifications] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$reports$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDashboardMetrics"])(user.storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$reports$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSalesTrend"])(user.storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listNotifications"])(user.storeId)
    ]);
    const unread = notifications.filter((item)=>!item.isRead && (item.userId == null || item.userId === user.id)).length;
    const cards = [
        {
            label: "Today's sales",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(metrics.revenue)
        },
        {
            label: "Today's profit",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(metrics.profit)
        },
        {
            label: "Purchases received",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(metrics.purchases)
        },
        {
            label: "Expenses",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(metrics.expenses)
        },
        {
            label: "Receivables",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(metrics.receivables)
        },
        {
            label: "Payables",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(metrics.payables)
        },
        {
            label: "Low stock",
            value: String(metrics.lowStock)
        },
        {
            label: "Out of stock",
            value: String(metrics.outOfStock)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto flex w-full max-w-6xl flex-col gap-6 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$page$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Dashboard",
                description: `${user.storeName} · ${user.roleName}`,
                actions: unread > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    href: "/settings",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buttonVariants"])({
                        variant: "outline"
                    })),
                    children: [
                        unread,
                        " notification",
                        unread === 1 ? "" : "s"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/dashboard/page.tsx",
                    lineNumber: 43,
                    columnNumber: 13
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
                children: cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border bg-card p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: card.label
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/dashboard/page.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xl font-semibold",
                                children: card.value
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/dashboard/page.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this)
                        ]
                    }, card.label, true, {
                        fileName: "[project]/app/(dashboard)/dashboard/page.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border bg-card p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-3 text-sm font-medium",
                        children: "Sales vs profit (14 days)"
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/dashboard/page.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$sales$2d$trend$2d$chart$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SalesTrendChart"], {
                        data: trend
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/dashboard/page.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/dashboard/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/dashboard/page.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/(dashboard)/dashboard/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(dashboard)/dashboard/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.2vob68tjqpejf.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256
};
}),
"[project]/components/layout/page-header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyState",
    ()=>EmptyState,
    "Field",
    ()=>Field,
    "NativeSelect",
    ()=>NativeSelect,
    "PageHeader",
    ()=>PageHeader,
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-rsc] (ecmascript)");
;
;
function PageHeader({ title, description, actions }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold tracking-tight",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/layout/page-header.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/components/layout/page-header.tsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/page-header.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            actions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: actions
            }, void 0, false, {
                fileName: "[project]/components/layout/page-header.tsx",
                lineNumber: 20,
                columnNumber: 18
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/page-header.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
function EmptyState({ title, description }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-dashed bg-muted/30 p-8 text-sm text-muted-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-medium text-foreground",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/layout/page-header.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1",
                children: description
            }, void 0, false, {
                fileName: "[project]/components/layout/page-header.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/page-header.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function Field({ label, children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-1.5 text-sm", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-medium",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/layout/page-header.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/page-header.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
function NativeSelect(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30", props.className)
    }, void 0, false, {
        fileName: "[project]/components/layout/page-header.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
function Textarea(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("min-h-20 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30", props.className)
    }, void 0, false, {
        fileName: "[project]/components/layout/page-header.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/reports/sales-trend-chart.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SalesTrendChart",
    ()=>SalesTrendChart
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SalesTrendChart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SalesTrendChart() from the server but SalesTrendChart is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/reports/sales-trend-chart.tsx", "SalesTrendChart");
}),
"[project]/components/reports/sales-trend-chart.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SalesTrendChart",
    ()=>SalesTrendChart
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SalesTrendChart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SalesTrendChart() from the server but SalesTrendChart is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/reports/sales-trend-chart.tsx <module evaluation>", "SalesTrendChart");
}),
"[project]/components/reports/sales-trend-chart.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$sales$2d$trend$2d$chart$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/reports/sales-trend-chart.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$sales$2d$trend$2d$chart$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/reports/sales-trend-chart.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$reports$2f$sales$2d$trend$2d$chart$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/lib/auth/store.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "requireStoreUser",
    ()=>requireStoreUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$dal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/dal.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$dal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$dal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function requireStoreUser() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$dal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireUser"])();
    if (!user.storeId) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/access-denied");
    }
    return user;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/reports/queries.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "getDashboardMetrics",
    ()=>getDashboardMetrics,
    "getInventorySnapshot",
    ()=>getInventorySnapshot,
    "getProfitLoss",
    ()=>getProfitLoss,
    "getSalesTrend",
    ()=>getSalesTrend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/data/queries.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sales$2f$pricing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sales/pricing.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/utils/money.ts [app-rsc] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function startOfDay(date) {
    const value = new Date(date);
    value.setHours(0, 0, 0, 0);
    return value;
}
async function getDashboardMetrics(storeId) {
    const today = startOfDay(new Date());
    const [sales, purchases, expenses, products, inventories, customers, suppliers, customerPayments, returns, supplierPayments] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listSales"])(storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listPurchases"])(storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listExpenses"])(storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listProducts"])(storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listInventories"])(storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listCustomers"])(storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listSuppliers"])(storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listCustomerPayments"])(storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listReturns"])(storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listSupplierPayments"])(storeId)
    ]);
    const todaySales = sales.filter((sale)=>sale.status !== "CANCELLED" && sale.createdAt >= today);
    const todayPurchases = purchases.filter((purchase)=>(purchase.status === "RECEIVED" || purchase.status === "COMPLETED") && purchase.receivedAt != null && purchase.receivedAt >= today);
    const todayExpenses = expenses.filter((expense)=>expense.date >= today);
    const inventoryByProduct = new Map(inventories.map((row)=>[
            row.productId,
            row
        ]));
    const revenue = todaySales.reduce((sum, sale)=>sum.plus(sale.total), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    const cogs = todaySales.reduce((sum, sale)=>sum.plus(sale.items.reduce((lineSum, item)=>lineSum.plus(item.costPrice.times(item.quantity)), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"])), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    const purchaseTotal = todayPurchases.reduce((sum, item)=>sum.plus(item.total), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    const expenseTotal = todayExpenses.reduce((sum, item)=>sum.plus(item.amount), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    const lowStock = products.filter((product)=>{
        const inventory = inventoryByProduct.get(product.id);
        return inventory && inventory.quantity.gt(0) && inventory.quantity.lte(product.minStock);
    }).length;
    const outOfStock = products.filter((product)=>{
        const inventory = inventoryByProduct.get(product.id);
        return !inventory || inventory.quantity.lte(0);
    }).length;
    const receivables = customers.reduce((sum, customer)=>{
        const credit = sales.filter((sale)=>sale.customerId === customer.id && sale.status !== "CANCELLED").reduce((value, sale)=>value.plus(sale.creditAmount), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
        const paid = customerPayments.filter((payment)=>payment.customerId === customer.id).reduce((value, payment)=>value.plus(payment.amount), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
        const storeCredit = returns.filter((entry)=>entry.customerId === customer.id).flatMap((entry)=>entry.refunds).filter((refund)=>refund.method === "STORE_CREDIT").reduce((value, refund)=>value.plus(refund.amount), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
        return sum.plus(customer.openingBalance.plus(credit).minus(paid).minus(storeCredit));
    }, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    const payables = suppliers.reduce((sum, supplier)=>{
        const purchased = purchases.filter((purchase)=>purchase.supplierId === supplier.id && (purchase.status === "RECEIVED" || purchase.status === "COMPLETED")).reduce((value, purchase)=>value.plus(purchase.total), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
        const paid = supplierPayments.filter((payment)=>payment.supplierId === supplier.id).reduce((value, payment)=>value.plus(payment.amount), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
        return sum.plus(supplier.openingBalance.plus(purchased).minus(paid));
    }, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    return {
        revenue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(revenue),
        purchases: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(purchaseTotal),
        expenses: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(expenseTotal),
        profit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sales$2f$pricing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["computeProfit"])(revenue, cogs, expenseTotal),
        cogs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(cogs),
        products: products.length,
        lowStock,
        outOfStock,
        receivables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(receivables),
        payables: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(payables)
    };
}
async function getSalesTrend(storeId, days = 14) {
    const from = startOfDay(new Date());
    from.setDate(from.getDate() - (days - 1));
    const sales = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listSales"])(storeId)).filter((sale)=>sale.status !== "CANCELLED" && sale.createdAt >= from).sort((a, b)=>a.createdAt.getTime() - b.createdAt.getTime());
    const buckets = new Map();
    for(let i = 0; i < days; i += 1){
        const date = new Date(from);
        date.setDate(from.getDate() + i);
        buckets.set(date.toISOString().slice(0, 10), {
            sales: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"],
            profit: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]
        });
    }
    for (const sale of sales){
        const key = sale.createdAt.toISOString().slice(0, 10);
        const bucket = buckets.get(key);
        if (!bucket) continue;
        const cogs = sale.items.reduce((sum, item)=>sum.plus(item.costPrice.times(item.quantity)), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
        bucket.sales = bucket.sales.plus(sale.total);
        bucket.profit = bucket.profit.plus(sale.total.minus(cogs));
    }
    return [
        ...buckets.entries()
    ].map(([date, value])=>({
            date,
            sales: Number(value.sales.toFixed(2)),
            profit: Number(value.profit.toFixed(2))
        }));
}
async function getProfitLoss(storeId, from, to) {
    const [sales, expenses] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listSales"])(storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listExpenses"])(storeId)
    ]);
    const rangedSales = sales.filter((sale)=>sale.status !== "CANCELLED" && sale.createdAt >= from && sale.createdAt <= to);
    const rangedExpenses = expenses.filter((expense)=>expense.date >= from && expense.date <= to);
    const revenue = rangedSales.reduce((sum, sale)=>sum.plus(sale.total), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    const cogs = rangedSales.reduce((sum, sale)=>sum.plus(sale.items.reduce((lineSum, item)=>lineSum.plus(item.costPrice.times(item.quantity)), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"])), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    const expenseTotal = rangedExpenses.reduce((sum, item)=>sum.plus(item.amount), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    return {
        from,
        to,
        revenue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(revenue),
        cogs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(cogs),
        expenses: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(expenseTotal),
        profit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sales$2f$pricing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["computeProfit"])(revenue, cogs, expenseTotal),
        saleCount: rangedSales.length
    };
}
async function getInventorySnapshot(storeId) {
    const [inventories, products] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listInventories"])(storeId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listProducts"])(storeId)
    ]);
    const productById = new Map(products.map((product)=>[
            product.id,
            product
        ]));
    return inventories.flatMap((row)=>{
        const product = productById.get(row.productId);
        return product ? [
            {
                ...row,
                product
            }
        ] : [];
    }).sort((a, b)=>a.product.name.localeCompare(b.product.name));
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/sales/pricing.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeProfit",
    ()=>computeProfit,
    "computeSaleLine",
    ()=>computeSaleLine,
    "computeSaleTotals",
    ()=>computeSaleTotals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/utils/money.ts [app-rsc] (ecmascript) <locals>");
;
function computeSaleLine(input) {
    const quantity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toQty"])(input.quantity);
    const unitPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(input.unitPrice);
    const discount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(input.discount ?? 0);
    const taxRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(input.taxRate ?? 0);
    const costPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(input.costPrice ?? 0);
    if (quantity.lte(0)) {
        throw new Error("Quantity must be greater than zero.");
    }
    const net = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(unitPrice.minus(discount));
    if (net.lt(0)) {
        throw new Error("Discount cannot exceed price.");
    }
    const lineNet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(net.times(quantity));
    const tax = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(lineNet.times(taxRate).dividedBy(100));
    const lineTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(lineNet.plus(tax));
    const cogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(costPrice.times(quantity));
    return {
        quantity,
        unitPrice,
        costPrice,
        discount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(discount.times(quantity)),
        tax,
        lineTotal,
        cogs
    };
}
function computeSaleTotals(lines) {
    const subtotal = lines.reduce((total, line)=>total.plus(line.unitPrice.times(line.quantity)), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    const discountTotal = lines.reduce((total, line)=>total.plus(line.discount), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    const taxTotal = lines.reduce((total, line)=>total.plus(line.tax), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    const cogs = lines.reduce((total, line)=>total.plus(line.cogs), __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["moneyZero"]);
    const total = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(subtotal.minus(discountTotal).plus(taxTotal));
    return {
        subtotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(subtotal),
        discountTotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(discountTotal),
        taxTotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(taxTotal),
        total,
        cogs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(cogs)
    };
}
function computeProfit(revenue, cogs, expenses) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(revenue).minus((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(cogs)).minus((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(expenses)));
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__18hoh5s._.js.map