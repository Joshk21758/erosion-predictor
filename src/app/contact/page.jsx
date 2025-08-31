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
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Contact Us</CardTitle>
          <CardDescription>
            Have a question or feedback? Fill out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="label-class">First name</Label>
              <Input name="first-name" placeholder="Enter your First Name" />
            </div>
            <div className="grid gap-2">
              <Label className="label-class">Last name</Label>
              <Input name="last-name" placeholder="Enter your Last name" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="label-class">Email</Label>
            <Input name="email" type="email" placeholder="Enter your Eamil" />
          </div>
          <div className="grid gap-2">
            <Label className="label-class">Message</Label>
            <Textarea
              name="message"
              placeholder="Share your Thoughts..."
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Send Message</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
