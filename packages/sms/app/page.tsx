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
const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Student Management System";

export default function HomePage() {
  const studentRole: UserRole = UserRole.STUDENT;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 p-8">
      <Card>
        <CardHeader>
          <CardTitle>{appName}</CardTitle>
          <CardDescription>Enrolment, profiles, and student services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Portal role (sample): <strong>{studentRole}</strong>
          </p>
          <p className="text-sm text-muted-foreground">API base URL: {apiUrl}</p>
          <Button type="button" variant="outline">
            View my profile
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
