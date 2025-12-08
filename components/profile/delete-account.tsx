"use client";

import * as React from "react";
import { deleteAccount } from "@/app/profile/actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function DeleteAccount() {
  const [confirmed, setConfirmed] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
    } catch (error) {
      console.error("Failed to delete account", error);
      setIsDeleting(false);
    }
  };

  return (
    <section className="flex-1">
      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">
            Delete Your Account
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 pt-6 text-sm">
          <div className="space-y-3">
            <p>Deleting your account is permanent.</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                You won&apos;t be able to log in again or restore your account,
                saved lessons, or favorites.
              </li>
              <li>
                Lessons and comments you&apos;ve shared will remain on Homeschool
                Lesson Hub but your name will be removed.
              </li>
              <li>
                This only affects your Homeschool Lesson Hub account.
              </li>
            </ul>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="confirm-delete"
              checked={confirmed}
              onCheckedChange={(value) => setConfirmed(!!value)}
            />
            <Label
              htmlFor="confirm-delete"
              className="text-xs leading-relaxed text-muted-foreground"
            >
              I have read the information above and understand that deleting my
              account is permanent and cannot be undone.
            </Label>
          </div>

          <div className="pt-2">
            <Button
              type="button"
              disabled={!confirmed || isDeleting}
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-60"
            >
              {isDeleting ? "Deleting..." : "Delete account"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}