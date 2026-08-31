import "server-only";

import { ROLE_PERMISSIONS, type RoleCode } from "@/constants/permissions";
import {
  getEmployeeByUserId,
  getUser,
  listAuditLogs,
  listEmployeesByStore,
  listUsersByStore,
} from "@/lib/data/queries";

export async function listEmployeeDirectory(storeId: string) {
  const [users, employees] = await Promise.all([
    listUsersByStore(storeId),
    listEmployeesByStore(storeId),
  ]);
  const employeeByUser = new Map(employees.map((item) => [item.userId, item]));
  return users
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      role: { code: user.roleCode, name: user.roleName },
      employee: employeeByUser.get(user.id) ?? null,
      grants: user.permissions.map((code) => ({
        permission: { code, name: code },
      })),
    }))
    .sort((a, b) => Number(b.isActive) - Number(a.isActive) || a.name.localeCompare(b.name));
}

export async function getEmployeeDetail(storeId: string, userId: string) {
  const user = await getUser(userId);
  if (!user || user.storeId !== storeId) {
    return null;
  }
  const employee = await getEmployeeByUserId(userId);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    role: { code: user.roleCode, name: user.roleName },
    employee,
    grants: user.permissions.map((code) => ({
      permission: { code, name: code },
    })),
    rolePermissions: (ROLE_PERMISSIONS[user.roleCode as RoleCode] ?? []).map(
      (code) => ({ permission: { code, name: code } }),
    ),
  };
}

export async function listEmployeeAuditLogs(storeId: string, userId: string) {
  const logs = await listAuditLogs(storeId);
  return logs
    .filter((log) => log.entityId === userId || log.userId === userId)
    .slice(0, 75)
    .map((log) => ({
      ...log,
      user: log.userName ? { name: log.userName, email: "" } : null,
    }));
}
