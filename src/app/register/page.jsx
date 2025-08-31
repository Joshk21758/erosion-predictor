'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl">Register</CardTitle>
          <CardDescription>
            Create an account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input id="email" type="email" placeholder="m@example.com"  />
          </div>
          <div className="grid gap-2">
            <Label>Password</Label>
            <Input name="password" type="password" />
          </div>
           <div className="grid gap-2">
            <Label>Confirm Password</Label>
            <Input name="confirm-password" type="password"  />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full">Sign up</Button>
           <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
