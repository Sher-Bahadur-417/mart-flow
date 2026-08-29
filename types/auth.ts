export type SessionUser = {
  id: string;
  name: string;
  email: string;
  roleCode: string;
  roleName: string;
  storeId: string | null;
  storeName: string | null;
  permissions: string[];
};
