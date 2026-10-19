import { ExamType } from "@mms/shared-types";
import { Button } from "@mms/shared-ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mms/shared-ui/components/card";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Result Management System";

export default function HomePage() {
  const defaultExam: ExamType = ExamType.ANNUAL;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 p-8">
      <Card>
        <CardHeader>
          <CardTitle>{appName}</CardTitle>
          <CardDescription>Exam results, grades, and report cards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Default exam filter (sample): <strong>{defaultExam}</strong>
          </p>
          <p className="text-sm text-muted-foreground">API base URL: {apiUrl}</p>
          <Button type="button" variant="ghost">
            Browse results
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
