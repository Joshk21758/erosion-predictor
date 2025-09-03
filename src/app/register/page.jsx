"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-5xl">Register</CardTitle>
            <CardDescription>Create an account to get started.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label className="label-class">Email</Label>
              <Input name="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="grid gap-2">
              <Label className="label-class">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your Password"
              />
            </div>
            <div className="grid gap-2">
              <Label className="label-class">Confirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Re-Enter your Password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Sign up</Button>
            <p className="mt-5 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
