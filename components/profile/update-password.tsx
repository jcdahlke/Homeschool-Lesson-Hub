"use client";

import { useState } from "react";
import { updatePassword } from "@/app/profile/actions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UpdatePassword() {
  const [status, setStatus] = useState<{
    error?: string;
    success?: string;
  } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setStatus(null);
    const result = await updatePassword(formData);
    if (result) {
      setStatus(result);
    }
  };

  return (
    <section className="flex-1">
      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">
            Update Password
          </CardTitle>
          <CardDescription>
            Change the password you use to sign in.
          </CardDescription>
        </CardHeader>

        <form action={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="************"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Type your new password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-type your new password"
                required
              />
            </div>

            {status?.error && (
              <div className="text-sm font-medium text-red-500">
                {status.error}
              </div>
            )}
            {status?.success && (
              <div className="text-sm font-medium text-green-600">
                {status.success}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                className="bg-brandGreen text-white hover:bg-brandGreen/90"
              >
                Save changes
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </section>
  );
}