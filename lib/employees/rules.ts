import {
  ALL_PERMISSIONS,
  ROLE_CODES,
  ROLE_PERMISSIONS,
  type PermissionCode,
  type RoleCode,
} from "@/constants/permissions";

export const STAFF_ROLE_CODES: RoleCode[] = [
  ROLE_CODES.MANAGER,
  ROLE_CODES.CASHIER,
  ROLE_CODES.INVENTORY_STAFF,
  ROLE_CODES.ACCOUNTANT,
];

export function isRoleCode(value: string): value is RoleCode {
  return Object.values(ROLE_CODES).includes(value as RoleCode);
}

export function isOwnerOrAdmin(roleCode: string) {
  return roleCode === ROLE_CODES.SUPER_ADMIN || roleCode === ROLE_CODES.OWNER;
}

export function assignableRoles(actorRole: string): RoleCode[] {
  if (isOwnerOrAdmin(actorRole)) {
    return [ROLE_CODES.OWNER, ...STAFF_ROLE_CODES];
  }
  if (actorRole === ROLE_CODES.MANAGER) {
    return [...STAFF_ROLE_CODES];
  }
  return [];
}

export function canAssignRole(actorRole: string, roleCode: string) {
  return assignableRoles(actorRole).includes(roleCode as RoleCode);
}

export function canManageTarget(actorRole: string, targetRole: string) {
  if (targetRole === ROLE_CODES.SUPER_ADMIN) {
    return actorRole === ROLE_CODES.SUPER_ADMIN;
  }
  if (targetRole === ROLE_CODES.OWNER) {
    return isOwnerOrAdmin(actorRole);
  }
  return assignableRoles(actorRole).length > 0;
}

export function grantablePermissions(
  actorRole: string,
  actorPermissions: string[],
): PermissionCode[] {
  if (isOwnerOrAdmin(actorRole)) {
    return [...ALL_PERMISSIONS];
  }
  return ALL_PERMISSIONS.filter(
    (code) => code !== "settings" && actorPermissions.includes(code),
  );
}

export function sanitizeGrantedPermissions(
  actorRole: string,
  actorPermissions: string[],
  requested: string[],
): PermissionCode[] {
  const allowed = new Set(grantablePermissions(actorRole, actorPermissions));
  const unique = new Set<PermissionCode>();
  for (const code of requested) {
    if (allowed.has(code as PermissionCode)) {
      unique.add(code as PermissionCode);
    }
  }
  return [...unique];
}

export function defaultPermissionsForRole(roleCode: string): PermissionCode[] {
  if (!isRoleCode(roleCode)) {
    return [];
  }
  return [...ROLE_PERMISSIONS[roleCode]];
}

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
}

export function normalizeEmployeeCode(value: string) {
  return value.trim().toUpperCase();
}

export function wouldRemoveLastOwner({
  targetRoleCode,
  targetIsActive,
  nextRoleCode,
  nextIsActive,
  otherActiveOwnerCount,
}: {
  targetRoleCode: string;
  targetIsActive: boolean;
  nextRoleCode?: string;
  nextIsActive?: boolean;
  otherActiveOwnerCount: number;
}) {
  if (targetRoleCode !== ROLE_CODES.OWNER || !targetIsActive) {
    return false;
  }

  const remainsOwner = (nextRoleCode ?? targetRoleCode) === ROLE_CODES.OWNER;
  const remainsActive = nextIsActive ?? targetIsActive;
  if (remainsOwner && remainsActive) {
    return false;
  }

  return otherActiveOwnerCount === 0;
}
