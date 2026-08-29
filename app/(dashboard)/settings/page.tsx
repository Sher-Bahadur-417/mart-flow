import { markNotificationRead, saveSetting } from "@/lib/settings/actions";
import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";
import { PageHeader, Field } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await requireStorePermission("settings");
  const [settings, auditLogs, notifications] = await Promise.all([
    prisma.setting.findMany({ where: { storeId: user.storeId } }),
    prisma.auditLog.findMany({
      where: { storeId: user.storeId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.notification.findMany({
      where: {
        storeId: user.storeId,
        OR: [{ userId: null }, { userId: user.id }],
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);
  const settingMap = new Map(settings.map((item) => [item.key, item.value]));

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-6">
      <PageHeader title="Settings" description="Store configuration, notifications, and audit history." />
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Name</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="font-medium">{user.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Role</dt>
            <dd className="font-medium">{user.roleName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Store</dt>
            <dd className="font-medium">{user.storeName ?? "None"}</dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          {user.permissions.map((permission) => (
            <Badge key={permission} variant="secondary">
              {permission}
            </Badge>
          ))}
        </div>
      </div>
      <form action={saveSetting} className="grid gap-3 rounded-xl border p-4 sm:grid-cols-[1fr_auto]">
        <input type="hidden" name="key" value="receipt_footer" />
        <Field label="Receipt footer">
          <Input
            name="value"
            defaultValue={settingMap.get("receipt_footer") ?? "Thank you for shopping."}
          />
        </Field>
        <Button type="submit" className="self-end">
          Save
        </Button>
      </form>
      <section className="space-y-2">
        <h2 className="font-medium">Notifications</h2>
        <ul className="divide-y rounded-xl border">
          {notifications.length === 0 ? (
            <li className="p-3 text-sm text-muted-foreground">No notifications.</li>
          ) : (
            notifications.map((item) => {
              const mark = markNotificationRead.bind(null, item.id);
              return (
                <li key={item.id} className="flex items-start justify-between gap-3 p-3 text-sm">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground">{item.body}</p>
                  </div>
                  {item.isRead ? null : (
                    <form action={mark}>
                      <Button size="sm" variant="ghost" type="submit">
                        Mark read
                      </Button>
                    </form>
                  )}
                </li>
              );
            })
          )}
        </ul>
      </section>
      <section className="space-y-2">
        <h2 className="font-medium">Audit log</h2>
        <div className="overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-2">When</th>
                <th className="p-2">User</th>
                <th className="p-2">Action</th>
                <th className="p-2">Entity</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="p-2 whitespace-nowrap">
                    {log.createdAt.toLocaleString()}
                  </td>
                  <td className="p-2">{log.user?.name ?? "System"}</td>
                  <td className="p-2">{log.action}</td>
                  <td className="p-2">{log.entity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
