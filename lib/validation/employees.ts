import { z } from "zod";

import { ALL_PERMISSIONS, type PermissionCode } from "@/constants/permissions";
import { isRoleCode } from "@/lib/employees/rules";

export const USERNAME_SCHEMA = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Username must be at least 3 characters.")
  .max(32, "Username must be 32 characters or fewer.")
  .regex(
    /^[a-z0-9][a-z0-9._-]*$/,
    "Username may contain letters, numbers, dots, hyphens, and underscores.",
  );

export const EMPLOYEE_CODE_SCHEMA = z
  .string()
  .trim()
  .toUpperCase()
  .min(3, "Employee ID must be at least 3 characters.")
  .max(32, "Employee ID must be 32 characters or fewer.")
  .regex(
    /^[A-Z0-9][A-Z0-9-]*$/,
    "Employee ID may contain letters, numbers, and hyphens.",
  );

const permissionSchema = z
  .string()
  .refine(
    (value): value is PermissionCode =>
      ALL_PERMISSIONS.includes(value as PermissionCode),
    "Unknown permission.",
  );

export const employeeInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.email("Enter a valid email."),
  username: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  jobTitle: z.string().trim().optional(),
  salary: z.string().trim().optional(),
  employeeCode: z.string().trim().optional(),
  roleCode: z
    .string()
    .refine((value) => isRoleCode(value) && value !== "SUPER_ADMIN", "Invalid role."),
  password: z.string().optional(),
  isActive: z.boolean().optional(),
  permissions: z.array(permissionSchema).default([]),
});

export type EmployeeInput = z.infer<typeof employeeInputSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type EmployeeFormState = {
  error?: string;
  success?: string;
};
