module.exports = [
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/.next-internal/server/app/(auth)/signup/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/auth/signup.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "60f558100e9b5dca4308d3f00cd639467b3fc12c48",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$signup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signup"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$auth$292f$signup$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$auth$2f$signup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(auth)/signup/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/auth/signup.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$signup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/signup.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$auth$292f$signup$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$auth$2f$signup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$signup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$auth$292f$signup$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$auth$2f$signup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$signup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/(auth)/signup/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/auth/signup.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$signup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/signup.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$signup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$signup$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/constants/permissions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_PERMISSIONS",
    ()=>ALL_PERMISSIONS,
    "PERMISSION_CODES",
    ()=>PERMISSION_CODES,
    "PERMISSION_LABELS",
    ()=>PERMISSION_LABELS,
    "ROLE_CODES",
    ()=>ROLE_CODES,
    "ROLE_PERMISSIONS",
    ()=>ROLE_PERMISSIONS,
    "ROUTE_PERMISSIONS",
    ()=>ROUTE_PERMISSIONS,
    "canAccess",
    ()=>canAccess
]);
const ROLE_CODES = {
    SUPER_ADMIN: "SUPER_ADMIN",
    OWNER: "OWNER",
    MANAGER: "MANAGER",
    CASHIER: "CASHIER",
    INVENTORY_STAFF: "INVENTORY_STAFF",
    ACCOUNTANT: "ACCOUNTANT"
};
const PERMISSION_CODES = {
    products: "products",
    inventory: "inventory",
    sales: "sales",
    purchases: "purchases",
    customers: "customers",
    suppliers: "suppliers",
    expenses: "expenses",
    reports: "reports",
    users: "users",
    settings: "settings"
};
const ALL_PERMISSIONS = Object.values(PERMISSION_CODES);
const PERMISSION_LABELS = {
    products: "Products",
    inventory: "Inventory",
    sales: "Sales / POS",
    purchases: "Purchases",
    customers: "Customers",
    suppliers: "Suppliers",
    expenses: "Expenses",
    reports: "Reports",
    users: "Employees",
    settings: "Settings"
};
const ROLE_PERMISSIONS = {
    SUPER_ADMIN: [
        ...ALL_PERMISSIONS
    ],
    OWNER: [
        ...ALL_PERMISSIONS
    ],
    MANAGER: [
        "products",
        "inventory",
        "sales",
        "purchases",
        "customers",
        "suppliers",
        "expenses",
        "reports",
        "users"
    ],
    CASHIER: [
        "sales",
        "customers"
    ],
    INVENTORY_STAFF: [
        "products",
        "inventory",
        "purchases",
        "suppliers"
    ],
    ACCOUNTANT: [
        "expenses",
        "reports"
    ]
};
const ROUTE_PERMISSIONS = {
    "/dashboard": null,
    "/pos": "sales",
    "/products": "products",
    "/categories": "products",
    "/inventory": "inventory",
    "/sales": "sales",
    "/returns": "sales",
    "/purchases": "purchases",
    "/suppliers": "suppliers",
    "/customers": "customers",
    "/khata": "customers",
    "/expenses": "expenses",
    "/employees": "users",
    "/reports": "reports",
    "/settings": "settings",
    "/access-denied": null
};
function canAccess(roleCode, permissions, required) {
    if (!required) {
        return true;
    }
    if (roleCode === ROLE_CODES.SUPER_ADMIN || roleCode === ROLE_CODES.OWNER) {
        return true;
    }
    return permissions.includes(required);
}
}),
"[project]/lib/auth/audit.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "getRequestContext",
    ()=>getRequestContext,
    "writeAuditLog",
    ()=>writeAuditLog
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/data/fs.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase-admin.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
async function getRequestContext() {
    const headerStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const forwarded = headerStore.get("x-forwarded-for");
    const ipAddress = forwarded?.split(",")[0]?.trim() || headerStore.get("x-real-ip") || "unknown";
    const userAgent = headerStore.get("user-agent");
    return {
        ipAddress,
        userAgent
    };
}
async function writeAuditLog(input) {
    try {
        const { ipAddress, userAgent } = await getRequestContext();
        let userName = null;
        if (input.userId) {
            const userSnap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].users).doc(input.userId).get();
            userName = userSnap.exists ? String(userSnap.data()?.name ?? "") : null;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].auditLogs).doc((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["newId"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].auditLogs)).set({
            action: input.action,
            entity: input.entity,
            entityId: input.entityId ?? null,
            userId: input.userId ?? null,
            userName,
            storeId: input.storeId ?? null,
            metadata: input.metadata ?? null,
            ipAddress,
            userAgent,
            createdAt: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["FieldValue"].serverTimestamp()
        });
    } catch (error) {
        console.error("Failed to write audit log", error);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/auth/bootstrap.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "ROLE_META",
    ()=>ROLE_META,
    "ensureRolesAndPermissions",
    ()=>ensureRolesAndPermissions,
    "getRoleDoc",
    ()=>getRoleDoc,
    "listRoleDocs",
    ()=>listRoleDocs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/permissions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase-admin.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const ROLE_META = {
    SUPER_ADMIN: {
        name: "Super Admin",
        description: "Full access across stores."
    },
    OWNER: {
        name: "Owner",
        description: "Full access for a store."
    },
    MANAGER: {
        name: "Manager",
        description: "Operations, sales, inventory, and employee management."
    },
    CASHIER: {
        name: "Cashier",
        description: "POS, sales, and customers."
    },
    INVENTORY_STAFF: {
        name: "Inventory Staff",
        description: "Catalog, stock, purchases, and suppliers."
    },
    ACCOUNTANT: {
        name: "Accountant",
        description: "Expenses, finance, and reports."
    }
};
function listRoleDocs(excludeSuperAdmin = false) {
    return Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"]).filter((code)=>!excludeSuperAdmin || code !== __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].SUPER_ADMIN).map((code)=>({
            id: code,
            code,
            name: ROLE_META[code].name,
            description: ROLE_META[code].description
        })).sort((a, b)=>a.name.localeCompare(b.name));
}
function getRoleDoc(code) {
    if (!(code in __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"])) {
        return null;
    }
    const roleCode = code;
    return {
        id: roleCode,
        code: roleCode,
        name: ROLE_META[roleCode].name,
        description: ROLE_META[roleCode].description
    };
}
async function ensureRolesAndPermissions() {
    const batch = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].batch();
    for (const code of __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ALL_PERMISSIONS"]){
        batch.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection("permissions").doc(code), {
            id: code,
            code,
            name: code
        }, {
            merge: true
        });
    }
    for (const code of Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"])){
        batch.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection("roles").doc(code), {
            id: code,
            code,
            name: ROLE_META[code].name,
            description: ROLE_META[code].description,
            permissions: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_PERMISSIONS"][code]
        }, {
            merge: true
        });
        for (const permission of __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_PERMISSIONS"][code]){
            batch.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection("rolePermissions").doc(`${code}_${permission}`), {
                roleId: code,
                permissionId: permission,
                permissionCode: permission
            });
        }
    }
    await batch.commit();
    const ownerRole = getRoleDoc(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].OWNER);
    if (!ownerRole) {
        throw new Error("Owner role could not be created.");
    }
    const permissionByCode = new Map(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ALL_PERMISSIONS"].map((code)=>[
            code,
            {
                id: code,
                code,
                name: code
            }
        ]));
    return {
        ownerRole,
        permissionByCode
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/auth/rate-limit.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "consumeLoginAttempt",
    ()=>consumeLoginAttempt
]);
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map();
function consumeLoginAttempt(key) {
    const now = Date.now();
    const current = attempts.get(key);
    if (!current || current.resetAt <= now) {
        attempts.set(key, {
            count: 1,
            resetAt: now + WINDOW_MS
        });
        return true;
    }
    if (current.count >= MAX_ATTEMPTS) {
        return false;
    }
    current.count += 1;
    return true;
}
}),
"[project]/lib/auth/safe-error.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNextRedirect",
    ()=>isNextRedirect,
    "publicAuthError",
    ()=>publicAuthError
]);
function publicAuthError(error) {
    const message = error instanceof Error ? error.message : "Authentication failed.";
    const lower = message.toLowerCase();
    if (lower.includes("failed to parse") && lower.includes("private key")) {
        return "Failed to parse FIREBASE_PRIVATE_KEY. Copy private_key from the Firebase service account JSON into double quotes, keeping the \\n sequences.";
    }
    if (lower.includes("firebase admin is not configured")) {
        return "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.";
    }
    if (lower.includes("firebase auth is not configured") || lower.includes("api_key")) {
        return "Firebase Auth is not configured. Set NEXT_PUBLIC_FIREBASE_API_KEY.";
    }
    if (lower.includes("session_secret")) {
        return "SESSION_SECRET is missing or shorter than 32 characters.";
    }
    if (lower.includes("already in use") || lower.includes("invalid email") || lower.includes("disabled") || lower.includes("too many") || lower.includes("password") || lower.includes("username") || lower.includes("authentication failed")) {
        return message;
    }
    console.error("Auth error", error);
    return message.replace(/\s+/g, " ").trim().slice(0, 280);
}
function isNextRedirect(error) {
    if (typeof error !== "object" || error === null || !("digest" in error)) {
        return false;
    }
    const digest = error.digest;
    return typeof digest === "string" && digest.includes("NEXT_REDIRECT");
}
}),
"[project]/lib/auth/session-token.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SESSION_COOKIE",
    ()=>SESSION_COOKIE,
    "SESSION_DURATION_MS",
    ()=>SESSION_DURATION_MS,
    "decrypt",
    ()=>decrypt,
    "encrypt",
    ()=>encrypt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/sign.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
;
const SESSION_COOKIE = "session";
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000;
function getSecretKey() {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error("SESSION_SECRET must be set to a string of at least 32 characters.");
    }
    return new TextEncoder().encode(secret);
}
async function encrypt(payload) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignJWT"](payload).setProtectedHeader({
        alg: "HS256"
    }).setIssuedAt().setExpirationTime("12h").sign(getSecretKey());
}
async function decrypt(session = "") {
    if (!session) {
        return null;
    }
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(session, getSecretKey(), {
            algorithms: [
                "HS256"
            ]
        });
        if (typeof payload.userId !== "string") {
            return null;
        }
        return payload;
    } catch  {
        return null;
    }
}
}),
"[project]/lib/auth/session.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSession",
    ()=>createSession,
    "deleteSession",
    ()=>deleteSession,
    "getSessionCookie",
    ()=>getSessionCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2d$token$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/session-token.ts [app-rsc] (ecmascript)");
;
;
;
async function createSession(userId) {
    const expiresAt = new Date(Date.now() + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2d$token$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SESSION_DURATION_MS"]);
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2d$token$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encrypt"])({
        userId
    });
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2d$token$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SESSION_COOKIE"], session, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: "/"
    });
}
async function deleteSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2d$token$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SESSION_COOKIE"]);
}
async function getSessionCookie() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return cookieStore.get(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2d$token$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SESSION_COOKIE"])?.value;
}
;
}),
"[project]/lib/auth/signup.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
/* __next_internal_action_entry_do_not_use__ [{"60f558100e9b5dca4308d3f00cd639467b3fc12c48":{"name":"signup"}},"lib/auth/signup.ts",""] */ __turbopack_context__.s([
    "signup",
    ()=>signup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/permissions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/audit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/bootstrap.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/rate-limit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$safe$2d$error$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/safe-error.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/auth/session.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/data/fs.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/data/queries.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase-admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$rest$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/rest-auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$document$2d$number$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/document-number.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/utils/money.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$document$2d$number$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$document$2d$number$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
;
;
;
;
;
;
async function uniqueStoreSlug(name) {
    const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["slugify"])(name) || "store";
    for(let index = 0; index < 30; index += 1){
        const slug = index === 0 ? base : `${base}-${index + 1}`;
        const exists = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["findStoreBySlug"])(slug);
        if (!exists) {
            return slug;
        }
    }
    return `${base}-${Date.now().toString(36)}`;
}
async function rollbackSignup(uid, storeId) {
    if (uid) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminAuth"].deleteUser(uid).catch((error)=>{
            console.error("Failed to delete Firebase Auth user during signup rollback", error);
        });
        const employeeSnap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].employees).where("userId", "==", uid).get();
        const batch = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].batch();
        employeeSnap.docs.forEach((doc)=>batch.delete(doc.ref));
        batch.delete(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].users).doc(uid));
        await batch.commit().catch((error)=>{
            console.error("Failed to delete Firestore user during signup rollback", error);
        });
    }
    if (storeId) {
        const names = [
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].settings,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].units,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].expenseCategories,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].counters,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].employees
        ];
        const batch = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].batch();
        for (const name of names){
            const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(name).where("storeId", "==", storeId).get();
            snap.docs.forEach((doc)=>batch.delete(doc.ref));
        }
        batch.delete(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].stores).doc(storeId));
        await batch.commit().catch((error)=>{
            console.error("Failed to delete store during signup rollback", error);
        });
    }
}
async function signup(_prevState, formData) {
    let storeId;
    let userId;
    try {
        const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignupSchema"].safeParse({
            storeName: formData.get("storeName"),
            name: formData.get("name"),
            email: formData.get("email"),
            username: formData.get("username"),
            phone: formData.get("phone"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword")
        });
        if (!parsed.success) {
            return {
                error: parsed.error.issues[0]?.message ?? "Enter valid signup details."
            };
        }
        const { ipAddress } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRequestContext"])();
        const allowed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$rate$2d$limit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["consumeLoginAttempt"])(`${ipAddress}:signup:${parsed.data.email}`);
        if (!allowed) {
            return {
                error: "Too many signup attempts. Try again in 15 minutes."
            };
        }
        const email = parsed.data.email.toLowerCase().trim();
        const username = parsed.data.username.toLowerCase().trim();
        if (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["findUserByEmail"])(email)) {
            return {
                error: "That email is already in use."
            };
        }
        if (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["findUserByUsername"])(username)) {
            return {
                error: "That username is already in use."
            };
        }
        const { ownerRole } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureRolesAndPermissions"])();
        const ownerPermissions = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_PERMISSIONS"][__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].OWNER]
        ];
        const phone = parsed.data.phone?.trim() || null;
        let authUser;
        try {
            authUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminAuth"].createUser({
                email,
                password: parsed.data.password,
                displayName: parsed.data.name,
                disabled: false
            });
        } catch (error) {
            return {
                error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$rest$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapAdminAuthError"])(error) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$safe$2d$error$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["publicAuthError"])(error)
            };
        }
        userId = authUser.uid;
        const storeRef = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].stores).doc();
        storeId = storeRef.id;
        const slug = await uniqueStoreSlug(parsed.data.storeName);
        const now = __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["FieldValue"].serverTimestamp();
        const employeeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["newId"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].employees);
        const employeeCode = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$document$2d$number$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nextDocumentNumber"])(storeId, "employee", "EMP");
        const batch = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].batch();
        batch.set(storeRef, {
            id: storeId,
            name: parsed.data.storeName,
            slug,
            isActive: true,
            createdAt: now,
            updatedAt: now
        });
        batch.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].users).doc(userId), {
            id: userId,
            storeId,
            roleId: ownerRole.id,
            roleCode: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].OWNER,
            roleName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$bootstrap$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_META"].OWNER.name,
            name: parsed.data.name,
            email,
            username,
            phone,
            permissions: ownerPermissions,
            isActive: true,
            lastLoginAt: now,
            createdAt: now,
            updatedAt: now
        });
        batch.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].employees).doc(employeeId), {
            id: employeeId,
            storeId,
            userId,
            employeeCode,
            phone,
            jobTitle: "Owner",
            hireDate: now,
            salary: null,
            isActive: true,
            createdAt: now,
            updatedAt: now
        });
        for (const code of ownerPermissions){
            batch.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection("userPermissions").doc(`${userId}_${code}`), {
                userId,
                permissionId: code,
                permissionCode: code
            });
        }
        batch.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].settings).doc(`${storeId}_receipt_footer`), {
            id: `${storeId}_receipt_footer`,
            storeId,
            key: "receipt_footer",
            value: `Thank you for shopping at ${parsed.data.storeName}.`
        });
        for (const unit of [
            {
                name: "Piece",
                abbreviation: "pcs"
            },
            {
                name: "Kilogram",
                abbreviation: "kg"
            },
            {
                name: "Litre",
                abbreviation: "L"
            }
        ]){
            const unitId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["newId"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].units);
            batch.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].units).doc(unitId), {
                id: unitId,
                storeId,
                ...unit
            });
        }
        for (const name of [
            "Rent",
            "Utilities",
            "Transport"
        ]){
            const categoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["newId"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].expenseCategories);
            batch.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].expenseCategories).doc(categoryId), {
                id: categoryId,
                storeId,
                name
            });
        }
        try {
            await batch.commit();
        } catch (error) {
            await rollbackSignup(userId, storeId);
            throw error;
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$session$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSession"])(userId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$audit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["writeAuditLog"])({
            action: "SIGNUP",
            entity: "User",
            entityId: userId,
            userId,
            storeId,
            metadata: {
                email,
                username
            }
        });
    } catch (error) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$safe$2d$error$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNextRedirect"])(error)) {
            throw error;
        }
        console.error("Signup failed", error);
        await rollbackSignup(userId, storeId).catch((rollbackError)=>{
            console.error("Signup rollback failed", rollbackError);
        });
        return {
            error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$safe$2d$error$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["publicAuthError"])(error)
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/dashboard");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    signup
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signup, "60f558100e9b5dca4308d3f00cd639467b3fc12c48", null);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/data/fs.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "asDate",
    ()=>asDate,
    "asDateOrNull",
    ()=>asDateOrNull,
    "collections",
    ()=>collections,
    "findOne",
    ()=>findOne,
    "getById",
    ()=>getById,
    "hydrateDoc",
    ()=>hydrateDoc,
    "listByStore",
    ()=>listByStore,
    "newId",
    ()=>newId,
    "serializeValue",
    ()=>serializeValue
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase-admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/decimal.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/utils/money.ts [app-rsc] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const collections = {
    stores: "stores",
    users: "users",
    employees: "employees",
    settings: "settings",
    units: "units",
    expenseCategories: "expenseCategories",
    expenses: "expenses",
    counters: "counters",
    categories: "categories",
    brands: "brands",
    products: "products",
    productBarcodes: "productBarcodes",
    inventories: "inventories",
    inventoryMovements: "inventoryMovements",
    stockAdjustments: "stockAdjustments",
    customers: "customers",
    customerPayments: "customerPayments",
    suppliers: "suppliers",
    supplierPayments: "supplierPayments",
    sales: "sales",
    heldCarts: "heldCarts",
    returns: "returns",
    purchases: "purchases",
    notifications: "notifications",
    auditLogs: "auditLogs"
};
function newId(collectionName) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(collectionName).doc().id;
}
function asDate(value) {
    if (value instanceof Date) {
        return value;
    }
    if (value && typeof value === "object" && "toDate" in value) {
        return value.toDate();
    }
    if (typeof value === "string" || typeof value === "number") {
        return new Date(value);
    }
    return new Date();
}
function asDateOrNull(value) {
    if (value == null || value === "") {
        return null;
    }
    return asDate(value);
}
function convertMoney(record, keys) {
    for (const key of keys){
        if (record[key] != null && record[key] !== "") {
            record[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(String(record[key]));
        }
    }
}
function convertQty(record, keys) {
    for (const key of keys){
        if (record[key] != null && record[key] !== "") {
            record[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toQty"])(String(record[key]));
        }
    }
}
function convertDates(record, keys) {
    for (const key of keys){
        if (record[key] != null) {
            record[key] = asDate(record[key]);
        }
    }
}
function hydrateDoc(id, data, options) {
    const record = {
        id,
        ...data
    };
    convertMoney(record, options?.money ?? []);
    convertQty(record, options?.qty ?? []);
    convertDates(record, options?.dates ?? []);
    return record;
}
function serializeValue(value) {
    if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Decimal"]) {
        return value.toString();
    }
    if (value instanceof Date) {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(serializeValue);
    }
    if (value && typeof value === "object") {
        return Object.fromEntries(Object.entries(value).map(([key, entry])=>[
                key,
                serializeValue(entry)
            ]));
    }
    return value;
}
async function getById(collectionName, id, hydrate) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(collectionName).doc(id).get();
    if (!snap.exists) {
        return null;
    }
    const data = snap.data() ?? {};
    return hydrate ? hydrate(snap.id, data) : {
        id: snap.id,
        ...data
    };
}
async function listByStore(collectionName, storeId, hydrate) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(collectionName).where("storeId", "==", storeId).get();
    return snap.docs.map((doc)=>hydrate ? hydrate(doc.id, doc.data()) : {
            id: doc.id,
            ...doc.data()
        });
}
async function findOne(query, hydrate) {
    const snap = await query.limit(1).get();
    const doc = snap.docs[0];
    if (!doc) {
        return null;
    }
    return hydrate ? hydrate(doc.id, doc.data()) : {
        id: doc.id,
        ...doc.data()
    };
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/data/queries.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "attachProductRelations",
    ()=>attachProductRelations,
    "findStoreBySlug",
    ()=>findStoreBySlug,
    "findUserByEmail",
    ()=>findUserByEmail,
    "findUserByUsername",
    ()=>findUserByUsername,
    "getCounterValue",
    ()=>getCounterValue,
    "getCustomer",
    ()=>getCustomer,
    "getEmployeeByUserId",
    ()=>getEmployeeByUserId,
    "getHeldCart",
    ()=>getHeldCart,
    "getProduct",
    ()=>getProduct,
    "getProductWithRelations",
    ()=>getProductWithRelations,
    "getPurchase",
    ()=>getPurchase,
    "getSale",
    ()=>getSale,
    "getSetting",
    ()=>getSetting,
    "getStore",
    ()=>getStore,
    "getSupplier",
    ()=>getSupplier,
    "getUser",
    ()=>getUser,
    "hydrateAuditLog",
    ()=>hydrateAuditLog,
    "hydrateBrand",
    ()=>hydrateBrand,
    "hydrateCategory",
    ()=>hydrateCategory,
    "hydrateCustomer",
    ()=>hydrateCustomer,
    "hydrateCustomerPayment",
    ()=>hydrateCustomerPayment,
    "hydrateEmployee",
    ()=>hydrateEmployee,
    "hydrateExpense",
    ()=>hydrateExpense,
    "hydrateExpenseCategory",
    ()=>hydrateExpenseCategory,
    "hydrateHeldCart",
    ()=>hydrateHeldCart,
    "hydrateInventory",
    ()=>hydrateInventory,
    "hydrateNotification",
    ()=>hydrateNotification,
    "hydrateProduct",
    ()=>hydrateProduct,
    "hydratePurchase",
    ()=>hydratePurchase,
    "hydrateReturn",
    ()=>hydrateReturn,
    "hydrateSale",
    ()=>hydrateSale,
    "hydrateSetting",
    ()=>hydrateSetting,
    "hydrateStore",
    ()=>hydrateStore,
    "hydrateSupplier",
    ()=>hydrateSupplier,
    "hydrateSupplierPayment",
    ()=>hydrateSupplierPayment,
    "hydrateUnit",
    ()=>hydrateUnit,
    "hydrateUser",
    ()=>hydrateUser,
    "listAuditLogs",
    ()=>listAuditLogs,
    "listBrands",
    ()=>listBrands,
    "listCategories",
    ()=>listCategories,
    "listCustomerPayments",
    ()=>listCustomerPayments,
    "listCustomers",
    ()=>listCustomers,
    "listEmployeesByStore",
    ()=>listEmployeesByStore,
    "listExpenseCategories",
    ()=>listExpenseCategories,
    "listExpenses",
    ()=>listExpenses,
    "listHeldCarts",
    ()=>listHeldCarts,
    "listInventories",
    ()=>listInventories,
    "listNotifications",
    ()=>listNotifications,
    "listProducts",
    ()=>listProducts,
    "listPurchases",
    ()=>listPurchases,
    "listReturns",
    ()=>listReturns,
    "listReturnsForSale",
    ()=>listReturnsForSale,
    "listSales",
    ()=>listSales,
    "listSettings",
    ()=>listSettings,
    "listSupplierPayments",
    ()=>listSupplierPayments,
    "listSuppliers",
    ()=>listSuppliers,
    "listUnits",
    ()=>listUnits,
    "listUsersByStore",
    ()=>listUsersByStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/data/fs.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase-admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/utils/money.ts [app-rsc] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function moneyField(value, fallback = "0") {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(String(value ?? fallback));
}
function qtyField(value, fallback = "0") {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toQty"])(String(value ?? fallback));
}
function optionalMoney(value) {
    if (value == null || value === "") {
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$money$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toMoney"])(String(value));
}
function hydrateStore(id, data) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hydrateDoc"])(id, data, {
        dates: [
            "createdAt",
            "updatedAt"
        ]
    });
}
function hydrateUser(id, data) {
    return {
        id,
        storeId: data.storeId ?? null,
        roleId: String(data.roleId ?? data.roleCode ?? ""),
        roleCode: String(data.roleCode ?? ""),
        roleName: String(data.roleName ?? ""),
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
        username: String(data.username ?? ""),
        phone: data.phone ?? null,
        permissions: Array.isArray(data.permissions) ? data.permissions.map(String) : [],
        isActive: data.isActive !== false,
        lastLoginAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDateOrNull"])(data.lastLoginAt),
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt),
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.updatedAt)
    };
}
function hydrateEmployee(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        userId: String(data.userId ?? ""),
        employeeCode: String(data.employeeCode ?? ""),
        phone: data.phone ?? null,
        jobTitle: data.jobTitle ?? null,
        hireDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDateOrNull"])(data.hireDate),
        salary: optionalMoney(data.salary),
        isActive: data.isActive !== false,
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt),
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.updatedAt)
    };
}
function hydrateSetting(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        key: String(data.key ?? ""),
        value: String(data.value ?? "")
    };
}
function hydrateUnit(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        name: String(data.name ?? ""),
        abbreviation: String(data.abbreviation ?? "")
    };
}
function hydrateCategory(id, data) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hydrateDoc"])(id, data, {
        dates: [
            "createdAt",
            "updatedAt"
        ]
    });
}
function hydrateBrand(id, data) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hydrateDoc"])(id, data, {
        dates: [
            "createdAt",
            "updatedAt"
        ]
    });
}
function hydrateProduct(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        name: String(data.name ?? ""),
        sku: String(data.sku ?? ""),
        categoryId: data.categoryId ?? null,
        brandId: data.brandId ?? null,
        unitId: data.unitId ?? null,
        purchasePrice: moneyField(data.purchasePrice),
        sellingPrice: moneyField(data.sellingPrice),
        taxRate: moneyField(data.taxRate),
        discount: moneyField(data.discount),
        minStock: qtyField(data.minStock),
        maxStock: data.maxStock == null || data.maxStock === "" ? null : qtyField(data.maxStock),
        expiryDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDateOrNull"])(data.expiryDate),
        imageUrl: data.imageUrl ?? null,
        isActive: data.isActive !== false,
        barcodes: Array.isArray(data.barcodes) ? data.barcodes.map(String) : [],
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt),
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.updatedAt)
    };
}
function hydrateInventory(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        productId: String(data.productId ?? id),
        quantity: qtyField(data.quantity),
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.updatedAt)
    };
}
function hydrateLineItem(item) {
    return {
        id: String(item.id ?? ""),
        productId: String(item.productId ?? ""),
        name: String(item.name ?? ""),
        sku: String(item.sku ?? ""),
        quantity: qtyField(item.quantity),
        unitPrice: moneyField(item.unitPrice),
        costPrice: moneyField(item.costPrice),
        discount: moneyField(item.discount),
        tax: moneyField(item.tax),
        lineTotal: moneyField(item.lineTotal)
    };
}
function hydrateSale(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        invoiceNumber: String(data.invoiceNumber ?? ""),
        cashierId: String(data.cashierId ?? ""),
        cashierName: String(data.cashierName ?? ""),
        customerId: data.customerId ?? null,
        customerName: data.customerName ?? null,
        status: data.status ?? "COMPLETED",
        subtotal: moneyField(data.subtotal),
        discountTotal: moneyField(data.discountTotal),
        taxTotal: moneyField(data.taxTotal),
        total: moneyField(data.total),
        paidAmount: moneyField(data.paidAmount),
        creditAmount: moneyField(data.creditAmount),
        note: data.note ?? null,
        items: Array.isArray(data.items) ? data.items.map((item)=>hydrateLineItem(item)) : [],
        payments: Array.isArray(data.payments) ? data.payments.map((payment)=>{
            const row = payment;
            return {
                id: String(row.id ?? ""),
                method: row.method ?? "CASH",
                amount: moneyField(row.amount)
            };
        }) : [],
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt)
    };
}
function hydrateReturn(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        saleId: String(data.saleId ?? ""),
        invoiceNumber: String(data.invoiceNumber ?? ""),
        cashierId: String(data.cashierId ?? ""),
        cashierName: String(data.cashierName ?? ""),
        customerId: data.customerId ?? null,
        total: moneyField(data.total),
        note: data.note ?? null,
        items: Array.isArray(data.items) ? data.items.map((item)=>{
            const row = item;
            return {
                id: String(row.id ?? ""),
                saleItemId: String(row.saleItemId ?? ""),
                productId: String(row.productId ?? ""),
                quantity: qtyField(row.quantity),
                unitPrice: moneyField(row.unitPrice),
                lineTotal: moneyField(row.lineTotal)
            };
        }) : [],
        refunds: Array.isArray(data.refunds) ? data.refunds.map((refund)=>{
            const row = refund;
            return {
                id: String(row.id ?? ""),
                method: row.method ?? "CASH",
                amount: moneyField(row.amount)
            };
        }) : [],
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt)
    };
}
function hydratePurchase(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        supplierId: String(data.supplierId ?? ""),
        supplierName: String(data.supplierName ?? ""),
        number: String(data.number ?? ""),
        status: data.status ?? "DRAFT",
        subtotal: moneyField(data.subtotal),
        total: moneyField(data.total),
        note: data.note ?? null,
        orderedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDateOrNull"])(data.orderedAt),
        receivedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDateOrNull"])(data.receivedAt),
        createdById: String(data.createdById ?? ""),
        items: Array.isArray(data.items) ? data.items.map((item)=>{
            const row = item;
            return {
                id: String(row.id ?? ""),
                productId: String(row.productId ?? ""),
                productName: String(row.productName ?? ""),
                quantityOrdered: qtyField(row.quantityOrdered),
                quantityReceived: qtyField(row.quantityReceived),
                unitCost: moneyField(row.unitCost),
                lineTotal: moneyField(row.lineTotal)
            };
        }) : [],
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt),
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.updatedAt)
    };
}
function hydrateCustomer(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        name: String(data.name ?? ""),
        phone: data.phone ?? null,
        email: data.email ?? null,
        address: data.address ?? null,
        openingBalance: moneyField(data.openingBalance),
        creditLimit: optionalMoney(data.creditLimit),
        isActive: data.isActive !== false,
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt),
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.updatedAt)
    };
}
function hydrateSupplier(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        name: String(data.name ?? ""),
        phone: data.phone ?? null,
        email: data.email ?? null,
        address: data.address ?? null,
        openingBalance: moneyField(data.openingBalance),
        isActive: data.isActive !== false,
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt),
        updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.updatedAt)
    };
}
function hydrateCustomerPayment(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        customerId: String(data.customerId ?? ""),
        amount: moneyField(data.amount),
        method: data.method ?? "CASH",
        note: data.note ?? null,
        createdById: String(data.createdById ?? ""),
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt)
    };
}
function hydrateSupplierPayment(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        supplierId: String(data.supplierId ?? ""),
        amount: moneyField(data.amount),
        method: data.method ?? "CASH",
        note: data.note ?? null,
        createdById: String(data.createdById ?? ""),
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt)
    };
}
function hydrateExpenseCategory(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        name: String(data.name ?? "")
    };
}
function hydrateExpense(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        categoryId: String(data.categoryId ?? ""),
        categoryName: String(data.categoryName ?? ""),
        amount: moneyField(data.amount),
        date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.date),
        method: data.method ?? "CASH",
        description: data.description ?? null,
        createdById: String(data.createdById ?? ""),
        createdByName: String(data.createdByName ?? ""),
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt)
    };
}
function hydrateNotification(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        userId: data.userId ?? null,
        title: String(data.title ?? ""),
        body: String(data.body ?? ""),
        isRead: Boolean(data.isRead),
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt)
    };
}
function hydrateAuditLog(id, data) {
    return {
        id,
        storeId: data.storeId ?? null,
        userId: data.userId ?? null,
        userName: data.userName ?? null,
        action: String(data.action ?? ""),
        entity: String(data.entity ?? ""),
        entityId: data.entityId ?? null,
        metadata: data.metadata ?? null,
        ipAddress: data.ipAddress ?? null,
        userAgent: data.userAgent ?? null,
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt)
    };
}
function hydrateHeldCart(id, data) {
    return {
        id,
        storeId: String(data.storeId ?? ""),
        cashierId: String(data.cashierId ?? ""),
        customerId: data.customerId ?? null,
        label: data.label ?? null,
        payload: data.payload,
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["asDate"])(data.createdAt)
    };
}
async function getStore(id) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].stores).doc(id).get();
    if (!snap.exists) {
        return null;
    }
    return hydrateStore(snap.id, snap.data() ?? {});
}
async function getUser(id) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].users).doc(id).get();
    if (!snap.exists) {
        return null;
    }
    return hydrateUser(snap.id, snap.data() ?? {});
}
async function findUserByUsername(username) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].users).where("username", "==", username).limit(1).get();
    const doc = snap.docs[0];
    return doc ? hydrateUser(doc.id, doc.data()) : null;
}
async function findUserByEmail(email) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].users).where("email", "==", email).limit(1).get();
    const doc = snap.docs[0];
    return doc ? hydrateUser(doc.id, doc.data()) : null;
}
async function findStoreBySlug(slug) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].stores).where("slug", "==", slug).limit(1).get();
    const doc = snap.docs[0];
    return doc ? hydrateStore(doc.id, doc.data()) : null;
}
async function listUsersByStore(storeId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].users, storeId, hydrateUser);
}
async function listEmployeesByStore(storeId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].employees, storeId, hydrateEmployee);
}
async function getEmployeeByUserId(userId) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].employees).where("userId", "==", userId).limit(1).get();
    const doc = snap.docs[0];
    return doc ? hydrateEmployee(doc.id, doc.data()) : null;
}
async function listSettings(storeId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].settings, storeId, hydrateSetting);
}
async function getSetting(storeId, key) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].settings).doc(`${storeId}_${key}`).get();
    if (!snap.exists) {
        return null;
    }
    return hydrateSetting(snap.id, snap.data() ?? {});
}
async function listUnits(storeId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].units, storeId, hydrateUnit);
}
async function listCategories(storeId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].categories, storeId, hydrateCategory);
    return rows.sort((a, b)=>a.name.localeCompare(b.name));
}
async function listBrands(storeId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].brands, storeId, hydrateBrand);
    return rows.sort((a, b)=>a.name.localeCompare(b.name));
}
async function listProducts(storeId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].products, storeId, hydrateProduct);
}
async function getProduct(id) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].products).doc(id).get();
    if (!snap.exists) {
        return null;
    }
    return hydrateProduct(snap.id, snap.data() ?? {});
}
async function listInventories(storeId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].inventories, storeId, hydrateInventory);
}
async function attachProductRelations(storeId, products) {
    const [inventories, categories, brands, units] = await Promise.all([
        listInventories(storeId),
        listCategories(storeId),
        listBrands(storeId),
        listUnits(storeId)
    ]);
    const inventoryByProduct = new Map(inventories.map((row)=>[
            row.productId,
            row
        ]));
    const categoryById = new Map(categories.map((row)=>[
            row.id,
            row
        ]));
    const brandById = new Map(brands.map((row)=>[
            row.id,
            row
        ]));
    const unitById = new Map(units.map((row)=>[
            row.id,
            row
        ]));
    return products.map((product)=>({
            ...product,
            inventory: inventoryByProduct.get(product.id) ?? null,
            category: product.categoryId ? categoryById.get(product.categoryId) ?? null : null,
            brand: product.brandId ? brandById.get(product.brandId) ?? null : null,
            unit: product.unitId ? unitById.get(product.unitId) ?? null : null,
            barcodes: product.barcodes.map((code)=>({
                    id: `${product.id}_${code}`,
                    storeId: product.storeId,
                    productId: product.id,
                    code
                }))
        }));
}
async function getProductWithRelations(storeId, id) {
    const product = await getProduct(id);
    if (!product || product.storeId !== storeId) {
        return null;
    }
    const [hydrated] = await attachProductRelations(storeId, [
        product
    ]);
    return hydrated ?? null;
}
async function listCustomers(storeId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].customers, storeId, hydrateCustomer);
    return rows.sort((a, b)=>a.name.localeCompare(b.name));
}
async function getCustomer(id) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].customers).doc(id).get();
    if (!snap.exists) {
        return null;
    }
    return hydrateCustomer(snap.id, snap.data() ?? {});
}
async function listSuppliers(storeId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].suppliers, storeId, hydrateSupplier);
    return rows.sort((a, b)=>a.name.localeCompare(b.name));
}
async function getSupplier(id) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].suppliers).doc(id).get();
    if (!snap.exists) {
        return null;
    }
    return hydrateSupplier(snap.id, snap.data() ?? {});
}
async function listCustomerPayments(storeId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].customerPayments, storeId, hydrateCustomerPayment);
}
async function listSupplierPayments(storeId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].supplierPayments, storeId, hydrateSupplierPayment);
}
async function listSales(storeId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].sales, storeId, hydrateSale);
    return rows.sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
}
async function getSale(id) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].sales).doc(id).get();
    if (!snap.exists) {
        return null;
    }
    return hydrateSale(snap.id, snap.data() ?? {});
}
async function listReturns(storeId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].returns, storeId, hydrateReturn);
    return rows.sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
}
async function listReturnsForSale(storeId, saleId) {
    const rows = await listReturns(storeId);
    return rows.filter((row)=>row.saleId === saleId);
}
async function listPurchases(storeId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].purchases, storeId, hydratePurchase);
    return rows.sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
}
async function getPurchase(id) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].purchases).doc(id).get();
    if (!snap.exists) {
        return null;
    }
    return hydratePurchase(snap.id, snap.data() ?? {});
}
async function listExpenseCategories(storeId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].expenseCategories, storeId, hydrateExpenseCategory);
    return rows.sort((a, b)=>a.name.localeCompare(b.name));
}
async function listExpenses(storeId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].expenses, storeId, hydrateExpense);
    return rows.sort((a, b)=>b.date.getTime() - a.date.getTime());
}
async function listNotifications(storeId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].notifications, storeId, hydrateNotification);
    return rows.sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
}
async function listAuditLogs(storeId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].auditLogs, storeId, hydrateAuditLog);
    return rows.sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
}
async function listHeldCarts(storeId, cashierId) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listByStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].heldCarts, storeId, hydrateHeldCart);
    return rows.filter((row)=>row.cashierId === cashierId).sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
}
async function getHeldCart(id) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].heldCarts).doc(id).get();
    if (!snap.exists) {
        return null;
    }
    return hydrateHeldCart(snap.id, snap.data() ?? {});
}
async function getCounterValue(storeId, key) {
    const snap = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].counters).doc(`${storeId}_${key}`).get();
    return snap.exists ? Number(snap.data()?.value ?? 0) : 0;
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/employees/rules.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STAFF_ROLE_CODES",
    ()=>STAFF_ROLE_CODES,
    "assignableRoles",
    ()=>assignableRoles,
    "canAssignRole",
    ()=>canAssignRole,
    "canManageTarget",
    ()=>canManageTarget,
    "defaultPermissionsForRole",
    ()=>defaultPermissionsForRole,
    "grantablePermissions",
    ()=>grantablePermissions,
    "isOwnerOrAdmin",
    ()=>isOwnerOrAdmin,
    "isRoleCode",
    ()=>isRoleCode,
    "normalizeEmployeeCode",
    ()=>normalizeEmployeeCode,
    "normalizeUsername",
    ()=>normalizeUsername,
    "sanitizeGrantedPermissions",
    ()=>sanitizeGrantedPermissions,
    "wouldRemoveLastOwner",
    ()=>wouldRemoveLastOwner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/permissions.ts [app-rsc] (ecmascript)");
;
const STAFF_ROLE_CODES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].MANAGER,
    __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].CASHIER,
    __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].INVENTORY_STAFF,
    __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].ACCOUNTANT
];
function isRoleCode(value) {
    return Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"]).includes(value);
}
function isOwnerOrAdmin(roleCode) {
    return roleCode === __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].SUPER_ADMIN || roleCode === __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].OWNER;
}
function assignableRoles(actorRole) {
    if (isOwnerOrAdmin(actorRole)) {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].OWNER,
            ...STAFF_ROLE_CODES
        ];
    }
    if (actorRole === __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].MANAGER) {
        return [
            ...STAFF_ROLE_CODES
        ];
    }
    return [];
}
function canAssignRole(actorRole, roleCode) {
    return assignableRoles(actorRole).includes(roleCode);
}
function canManageTarget(actorRole, targetRole) {
    if (targetRole === __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].SUPER_ADMIN) {
        return actorRole === __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].SUPER_ADMIN;
    }
    if (targetRole === __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].OWNER) {
        return isOwnerOrAdmin(actorRole);
    }
    return assignableRoles(actorRole).length > 0;
}
function grantablePermissions(actorRole, actorPermissions) {
    if (isOwnerOrAdmin(actorRole)) {
        return [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ALL_PERMISSIONS"]
        ];
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ALL_PERMISSIONS"].filter((code)=>code !== "settings" && actorPermissions.includes(code));
}
function sanitizeGrantedPermissions(actorRole, actorPermissions, requested) {
    const allowed = new Set(grantablePermissions(actorRole, actorPermissions));
    const unique = new Set();
    for (const code of requested){
        if (allowed.has(code)) {
            unique.add(code);
        }
    }
    return [
        ...unique
    ];
}
function defaultPermissionsForRole(roleCode) {
    if (!isRoleCode(roleCode)) {
        return [];
    }
    return [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_PERMISSIONS"][roleCode]
    ];
}
function normalizeUsername(value) {
    return value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
}
function normalizeEmployeeCode(value) {
    return value.trim().toUpperCase();
}
function wouldRemoveLastOwner({ targetRoleCode, targetIsActive, nextRoleCode, nextIsActive, otherActiveOwnerCount }) {
    if (targetRoleCode !== __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].OWNER || !targetIsActive) {
        return false;
    }
    const remainsOwner = (nextRoleCode ?? targetRoleCode) === __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_CODES"].OWNER;
    const remainsActive = nextIsActive ?? targetIsActive;
    if (remainsOwner && remainsActive) {
        return false;
    }
    return otherActiveOwnerCount === 0;
}
}),
"[project]/lib/firebase-admin.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "adminAuth",
    ()=>adminAuth,
    "firestore",
    ()=>firestore,
    "getAdminAuth",
    ()=>getAdminAuth,
    "getDb",
    ()=>getDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/app [external] (firebase-admin/app, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/auth [external] (firebase-admin/auth, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$private$2d$key$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase/private-key.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
function requiredEnv(name) {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Firebase Admin is not configured. Set ${name} in the environment.`);
    }
    return value;
}
function resolveCredentialFile(pathValue) {
    const cleaned = pathValue.trim().replace(/^["']|["']$/g, "");
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["isAbsolute"])(cleaned) ? cleaned : (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["resolve"])(process.cwd(), cleaned);
}
function credentialFromServiceAccountFile(pathValue) {
    const filePath = resolveCredentialFile(pathValue);
    if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["existsSync"])(filePath)) {
        throw new Error("Firebase service account file not found. Check FIREBASE_SERVICE_ACCOUNT_PATH.");
    }
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["cert"])(filePath);
}
function getAdminApp() {
    const existing = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getApps"])()[0];
    if (existing) {
        return existing;
    }
    try {
        const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim() || process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
        if (filePath) {
            return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["initializeApp"])({
                credential: credentialFromServiceAccountFile(filePath)
            });
        }
        const privateKeyEnv = requiredEnv("FIREBASE_PRIVATE_KEY");
        const unquoted = privateKeyEnv.replace(/^["']|["']$/g, "");
        if (unquoted.endsWith(".json")) {
            return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["initializeApp"])({
                credential: credentialFromServiceAccountFile(unquoted)
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["initializeApp"])({
            credential: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["cert"])({
                projectId: requiredEnv("FIREBASE_PROJECT_ID"),
                clientEmail: requiredEnv("FIREBASE_CLIENT_EMAIL"),
                privateKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$private$2d$key$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeFirebasePrivateKey"])(privateKeyEnv)
            })
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes("FIREBASE_")) {
            throw error;
        }
        const message = error instanceof Error ? error.message.toLowerCase() : "";
        if (message.includes("private key") || message.includes("failed to parse")) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2f$private$2d$key$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["invalidPrivateKeyError"])();
        }
        throw error;
    }
}
function getAdminAuth() {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getAuth"])(getAdminApp());
}
function getDb() {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getFirestore"])(getAdminApp());
}
const adminAuth = new Proxy({}, {
    get (_target, property) {
        const auth = getAdminAuth();
        const value = Reflect.get(auth, property, auth);
        return typeof value === "function" ? value.bind(auth) : value;
    }
});
const firestore = new Proxy({}, {
    get (_target, property) {
        const db = getDb();
        const value = Reflect.get(db, property, db);
        return typeof value === "function" ? value.bind(db) : value;
    }
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/firebase/private-key.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "describePrivateKeyProblem",
    ()=>describePrivateKeyProblem,
    "invalidPrivateKeyError",
    ()=>invalidPrivateKeyError,
    "normalizeFirebasePrivateKey",
    ()=>normalizeFirebasePrivateKey
]);
/**
 * Firebase service-account PEMs arrive from .env / Vercel in several shapes.
 * Normalize them into a PKCS#8 PEM that Node's crypto can parse.
 */ const PEM_HEADER = /-----BEGIN [A-Z ]+KEY-----/;
const PEM_FOOTER = /-----END [A-Z ]+KEY-----/;
const PEM_BLOCK = /-----BEGIN [A-Z ]+KEY-----[\s\S]*?-----END [A-Z ]+KEY-----/;
function normalizeFirebasePrivateKey(raw) {
    let key = stripBom(raw).trim();
    if (!key) {
        throw new Error("FIREBASE_PRIVATE_KEY is empty.");
    }
    key = key.replace(/[\u2010-\u2015\u2212]/g, "-");
    key = key.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
    key = key.replace(/\\"/g, '"').replace(/\\'/g, "'");
    key = unwrapQuotes(key);
    key = extractFromServiceAccountJson(key);
    key = unwrapQuotes(key);
    key = unescapeNewlines(key);
    key = key.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\u00a0/g, " ");
    const pem = extractPemBlock(key);
    if (pem) {
        key = pem;
    }
    key = decodeBase64IfNeeded(key.trim());
    key = rewrapPem(key.trim());
    if (!PEM_HEADER.test(key) || !PEM_FOOTER.test(key)) {
        throw new Error(describePrivateKeyProblem(raw));
    }
    return key.endsWith("\n") ? key : `${key}\n`;
}
function describePrivateKeyProblem(raw) {
    const trimmed = raw.trim();
    if (!trimmed) {
        return "FIREBASE_PRIVATE_KEY is empty.";
    }
    if (trimmed.endsWith(".json")) {
        return "FIREBASE_PRIVATE_KEY looks like a file path. Set FIREBASE_SERVICE_ACCOUNT_PATH to the service account JSON file instead.";
    }
    if (trimmed.startsWith("{") && trimmed.length < 80) {
        return "FIREBASE_PRIVATE_KEY looks like truncated JSON. Set FIREBASE_SERVICE_ACCOUNT_PATH to the downloaded JSON file, or paste private_key as one quoted line.";
    }
    if (trimmed.includes("BEGIN") && !trimmed.includes("END")) {
        return "FIREBASE_PRIVATE_KEY is truncated (BEGIN without END). Put the entire key on one line in double quotes, or set FIREBASE_SERVICE_ACCOUNT_PATH.";
    }
    return "Failed to parse FIREBASE_PRIVATE_KEY. Copy only the private_key value from the service account JSON into double quotes, or set FIREBASE_SERVICE_ACCOUNT_PATH to that JSON file.";
}
function invalidPrivateKeyError() {
    return new Error(describePrivateKeyProblem("invalid"));
}
function stripBom(value) {
    return value.charCodeAt(0) === 0xfeff ? value.slice(1) : value;
}
function unwrapQuotes(value) {
    let key = value.trim();
    for(let i = 0; i < 4; i += 1){
        const wrapped = key.startsWith('"') && key.endsWith('"') || key.startsWith("'") && key.endsWith("'");
        if (!wrapped || key.length < 2) {
            break;
        }
        key = key.slice(1, -1).trim();
    }
    return key;
}
function extractFromServiceAccountJson(value) {
    const trimmed = value.trim();
    if (!trimmed.startsWith("{")) {
        return value;
    }
    try {
        const parsed = JSON.parse(trimmed);
        if (typeof parsed === "object" && parsed !== null && "private_key" in parsed && typeof parsed.private_key === "string") {
            return parsed.private_key;
        }
    } catch  {
        return value;
    }
    return value;
}
function unescapeNewlines(value) {
    let key = value.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n").replace(/\\r/g, "\n");
    for(let i = 0; i < 2 && key.includes("\\n"); i += 1){
        key = key.replace(/\\n/g, "\n");
    }
    return key;
}
function extractPemBlock(value) {
    return value.match(PEM_BLOCK)?.[0] ?? null;
}
function decodeBase64IfNeeded(value) {
    if (value.includes("BEGIN")) {
        return value;
    }
    const compact = value.replace(/\s/g, "");
    if (compact.length < 80 || !/^[A-Za-z0-9+/=]+$/.test(compact)) {
        return value;
    }
    try {
        const decoded = Buffer.from(compact, "base64").toString("utf8");
        if (decoded.includes("BEGIN")) {
            return decoded;
        }
    } catch  {
        return value;
    }
    return value;
}
function rewrapPem(value) {
    const headerMatch = value.match(PEM_HEADER);
    const footerMatch = value.match(PEM_FOOTER);
    if (!headerMatch || !footerMatch || headerMatch.index === undefined) {
        return value;
    }
    const header = headerMatch[0];
    const footer = footerMatch[0];
    const bodyStart = headerMatch.index + header.length;
    const bodyEnd = value.indexOf(footer, bodyStart);
    if (bodyEnd < 0) {
        return value;
    }
    const body = value.slice(bodyStart, bodyEnd).replace(/\\n/g, "").replace(/\s+/g, "");
    if (!body) {
        return value;
    }
    const wrapped = body.match(/.{1,64}/g)?.join("\n") ?? body;
    return `${header}\n${wrapped}\n${footer}\n`;
}
}),
"[project]/lib/firebase/rest-auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapAdminAuthError",
    ()=>mapAdminAuthError,
    "signInWithEmailPassword",
    ()=>signInWithEmailPassword
]);
;
function apiKey() {
    const key = ("TURBOPACK compile-time value", "YOUR_ACTUAL_FIREBASE_API_KEY")?.trim();
    if (!key) {
        throw new Error("Firebase Auth is not configured. Set NEXT_PUBLIC_FIREBASE_API_KEY.");
    }
    return key;
}
function mapAuthError(message) {
    switch(message){
        case "EMAIL_EXISTS":
            return "That email is already in use.";
        case "EMAIL_NOT_FOUND":
        case "INVALID_PASSWORD":
        case "INVALID_LOGIN_CREDENTIALS":
            return "Invalid email, username, or password.";
        case "USER_DISABLED":
            return "This account is disabled.";
        case "WEAK_PASSWORD":
            return "Password must be at least 6 characters.";
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
            return "Too many attempts. Try again later.";
        default:
            return message ? "Authentication failed. Check Firebase Auth configuration." : "Authentication failed.";
    }
}
async function postIdentity(path, body) {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/${path}?key=${apiKey()}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const payload = await response.json();
    if (!response.ok || payload.error?.message) {
        throw new Error(mapAuthError(payload.error?.message));
    }
    return payload;
}
async function signInWithEmailPassword(email, password) {
    return postIdentity("accounts:signInWithPassword", {
        email,
        password,
        returnSecureToken: true
    });
}
function mapAdminAuthError(error) {
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    const message = error instanceof Error ? error.message : "";
    if (code.includes("email-already-exists") || message.includes("email-already-exists")) {
        return "That email is already in use.";
    }
    if (code.includes("invalid-email")) {
        return "Enter a valid email address.";
    }
    if (code.includes("weak-password")) {
        return "Password must be at least 6 characters.";
    }
    if (code.includes("user-not-found")) {
        return "Account not found.";
    }
    return null;
}
}),
"[project]/lib/utils/decimal.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/utils/document-number.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "nextDocumentNumber",
    ()=>nextDocumentNumber,
    "readNextCounter",
    ()=>readNextCounter,
    "writeCounter",
    ()=>writeCounter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/data/fs.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase-admin.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function nextDocumentNumber(storeId, key, prefix) {
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].counters).doc(`${storeId}_${key}`);
    const value = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].runTransaction(async (tx)=>{
        const snap = await tx.get(ref);
        const current = snap.exists ? Number(snap.data()?.value ?? 0) : 0;
        const next = current + 1;
        tx.set(ref, {
            storeId,
            key,
            value: next
        }, {
            merge: true
        });
        return next;
    });
    return `${prefix}-${String(value).padStart(6, "0")}`;
}
async function readNextCounter(tx, storeId, key) {
    const ref = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].counters).doc(`${storeId}_${key}`);
    const snap = await tx.get(ref);
    return (snap.exists ? Number(snap.data()?.value ?? 0) : 0) + 1;
}
function writeCounter(tx, storeId, key, value) {
    tx.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firestore"].collection(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$fs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["collections"].counters).doc(`${storeId}_${key}`), {
        storeId,
        key,
        value
    }, {
        merge: true
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/utils/money.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils/decimal.ts [app-rsc] (ecmascript)");
;
;
const moneyZero = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Decimal"](0);
const qtyZero = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Decimal"](0);
function toMoney(value) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Decimal"](value).toDecimalPlaces(2);
}
function toQty(value) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2f$decimal$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Decimal"](value).toDecimalPlaces(3);
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
"[project]/lib/validation/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoginSchema",
    ()=>LoginSchema,
    "SignupSchema",
    ()=>SignupSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$employees$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validation/employees.ts [app-rsc] (ecmascript)");
;
;
const LoginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    identifier: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Email or username is required."),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Password is required.")
});
const SignupSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    storeName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(2, "Store name is required."),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Your name is required."),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].email("Enter a valid email."),
    username: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validation$2f$employees$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["USERNAME_SCHEMA"],
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().optional(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8, "Password must be at least 8 characters."),
    confirmPassword: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Confirm your password.")
}).refine((value)=>value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: [
        "confirmPassword"
    ]
});
}),
"[project]/lib/validation/employees.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMPLOYEE_CODE_SCHEMA",
    ()=>EMPLOYEE_CODE_SCHEMA,
    "USERNAME_SCHEMA",
    ()=>USERNAME_SCHEMA,
    "employeeInputSchema",
    ()=>employeeInputSchema,
    "resetPasswordSchema",
    ()=>resetPasswordSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/permissions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$employees$2f$rules$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/employees/rules.ts [app-rsc] (ecmascript)");
;
;
;
const USERNAME_SCHEMA = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().toLowerCase().min(3, "Username must be at least 3 characters.").max(32, "Username must be 32 characters or fewer.").regex(/^[a-z0-9][a-z0-9._-]*$/, "Username may contain letters, numbers, dots, hyphens, and underscores.");
const EMPLOYEE_CODE_SCHEMA = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().toUpperCase().min(3, "Employee ID must be at least 3 characters.").max(32, "Employee ID must be 32 characters or fewer.").regex(/^[A-Z0-9][A-Z0-9-]*$/, "Employee ID may contain letters, numbers, and hyphens.");
const permissionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().refine((value)=>__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$permissions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ALL_PERMISSIONS"].includes(value), "Unknown permission.");
const employeeInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Name is required."),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].email("Enter a valid email."),
    username: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().optional(),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().optional(),
    jobTitle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().optional(),
    salary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().optional(),
    employeeCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().optional(),
    roleCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().refine((value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$employees$2f$rules$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isRoleCode"])(value) && value !== "SUPER_ADMIN", "Invalid role."),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    isActive: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    permissions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(permissionSchema).default([])
});
const resetPasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8, "Password must be at least 8 characters.")
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0nlj9-2._.js.map