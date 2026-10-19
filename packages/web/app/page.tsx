import { UserRole } from "@mms/shared-types";
import { Button } from "@mms/shared-ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mms/shared-ui/components/card";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Management Dashboard";

export default function HomePage() {
  const adminRole: UserRole = UserRole.ADMIN;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 p-8">
      <Card>
        <CardHeader>
          <CardTitle>{appName}</CardTitle>
          <CardDescription>
            Madrasah Management System — central administration portal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Signed-in role context (sample): <strong>{adminRole}</strong>
          </p>
          <p className="text-sm text-muted-foreground">API base URL: {apiUrl}</p>
          <Button type="button">Open dashboard</Button>
        </CardContent>
      </Card>
    </main>
  );
}
