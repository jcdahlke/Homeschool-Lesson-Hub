// components/profile/update-profile.tsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

export function UpdateProfile() {
  return (
    <section className="flex-1">
      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-semibold">
            Update Profile
          </CardTitle>
          <CardDescription>
            Manage your profile on Homeschool Lesson Hub.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          {/* Profile image row */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase text-muted-foreground">
              Profile Image
            </Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-muted">
                <Image
                src="/images/pfp-bjgraves.png"
                alt="User avatar"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
              </div>
              <Button
                type="button"
                variant="default"
                className="bg-brandGreen text-white hover:bg-brandGreen/90"
              >
                Change image
              </Button>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="@johndoe"
            />
          </div>

          {/* About me */}
          <div className="space-y-2">
            <Label htmlFor="about">About me</Label>
            <Textarea
              id="about"
              name="about"
              rows={5}
              placeholder="Write a short introduction about yourself for others to read."
            />
          </div>

          {/* Save button aligned to the right */}
          <div className="flex justify-end">
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
