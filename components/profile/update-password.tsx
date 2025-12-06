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

        <CardContent className="space-y-6 pt-6">
          {/* Current password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="************"
            />
          </div>

          {/* New password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Type your new password"
            />
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-type your new password. Make sure they match."
            />
          </div>

          {/* Save button */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              className="bg-brandGreen text-white hover:bg-brandGreen/90"
            >
              Save changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
