-- AlterTable
ALTER TABLE "User" ADD COLUMN "username" TEXT;

UPDATE "User"
SET "username" = NULLIF(lower(split_part("email", '@', 1)), '');

UPDATE "User"
SET "username" = 'user-' || "id"
WHERE "username" IS NULL OR "username" = '';

WITH ranked AS (
  SELECT id, username, ROW_NUMBER() OVER (PARTITION BY username ORDER BY "createdAt", id) AS rn
  FROM "User"
)
UPDATE "User" AS u
SET "username" = r.username || '-' || u.id
FROM ranked AS r
WHERE u.id = r.id AND r.rn > 1;

ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;

CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN "employeeCode" TEXT;

WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY "storeId" ORDER BY "createdAt", id) AS rn
  FROM "Employee"
)
UPDATE "Employee" AS e
SET "employeeCode" = 'EMP-' || lpad(n.rn::text, 6, '0')
FROM numbered AS n
WHERE e.id = n.id;

ALTER TABLE "Employee" ALTER COLUMN "employeeCode" SET NOT NULL;

CREATE UNIQUE INDEX "Employee_storeId_employeeCode_key" ON "Employee"("storeId", "employeeCode");

CREATE INDEX "Employee_storeId_isActive_idx" ON "Employee"("storeId", "isActive");

INSERT INTO "Counter" ("storeId", "key", "value")
SELECT e."storeId", 'employee', COUNT(*)::int
FROM "Employee" e
GROUP BY e."storeId"
ON CONFLICT ("storeId", "key") DO UPDATE SET "value" = GREATEST("Counter"."value", EXCLUDED."value");

ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userId_fkey";

ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "UserPermission" (
    "userId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "UserPermission_pkey" PRIMARY KEY ("userId", "permissionId")
);

ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "UserPermission" ("userId", "permissionId")
SELECT u.id, rp."permissionId"
FROM "User" u
JOIN "RolePermission" rp ON rp."roleId" = u."roleId"
ON CONFLICT DO NOTHING;
