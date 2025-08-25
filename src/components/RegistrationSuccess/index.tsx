import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/ui';
import { CheckCircle } from 'lucide-react';
import Button from '../Button';
import { Typography } from '../Typography';

export function RegistrationSuccess({
  username,
  email,
}: {
  username?: string;
  email?: string;
}) {
  return (
    <Card className="max-w-md mx-auto text-center">
      <CardHeader>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'var(--color-success-background)' }}
        >
          <CheckCircle
            className="h-8 w-8"
            style={{ color: 'var(--color-success)' }}
          />
        </div>
        <CardTitle className="text-2xl">Account Created!</CardTitle>
        <CardDescription>
          Welcome aboard! Your account has been successfully created.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="space-y-2 text-sm"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          <Typography>Username: {username}</Typography>
          <Typography>Email: {email}</Typography>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => window.location.reload()}>
          Start New Registration
        </Button>
      </CardFooter>
    </Card>
  );
}
