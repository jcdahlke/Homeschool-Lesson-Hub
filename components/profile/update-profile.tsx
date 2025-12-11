"use client";

import { useState } from "react";
import { updateProfile } from "@/app/profile/actions"; // Import the backend action
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

// Define the shape of the data we expect
interface ProfileData {
  full_name: string | null;
  username: string | null;
  bio: string | null;
  profile_image: string | null;
}

export function UpdateProfile({
  initialData,
}: {
  initialData: ProfileData | null;
}) {
  const [status, setStatus] = useState<{
    error?: string;
    success?: string;
  } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setStatus(null);
    const result = await updateProfile(formData);
    if (result) {
      setStatus(result);
    }
  };

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

        {/* Connect the form to the wrapper function */}
        <form action={handleSubmit}>
          <CardContent className="space-y-8 pt-6">
            {/* Profile Image Display */}
            <div className="space-y-3">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">
                Profile Image
              </Label>

              <div className="flex items-center gap-4">
                {initialData?.profile_image ? (
                  <img
                    src={initialData.profile_image}
                    alt="Profile"
                    className="h-16 w-16 rounded-full object-cover bg-muted"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-muted" />
                )}

                {/* Custom File Input Button */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="profileImage"
                    className="cursor-pointer rounded-md bg-brandGreen px-4 py-2 text-sm font-medium text-white hover:bg-brandGreenDark"
                  >
                    Choose File
                  </label>

                  {/* Hidden native input */}
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const span = document.getElementById("fileName");
                      span!.textContent =
                        e.target.files?.[0]?.name || "No file chosen";
                    }}
                  />

                  {/* Browser-controlled filename text */}
                  <span id="fileName" className="text-sm text-muted-foreground">
                    No file chosen
                  </span>
                </div>
              </div>
            </div>

            {/* Full Name
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                defaultValue={initialData?.full_name || ""} 
              />
            </div> */}

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="@johndoe"
                defaultValue={initialData?.username || ""}
              />
            </div>

            {/* About Me */}
            <div className="space-y-2">
              <Label htmlFor="about">About me</Label>
              <Textarea
                id="about"
                name="about"
                rows={5}
                placeholder="Write a short introduction..."
                defaultValue={initialData?.bio || ""}
              />
            </div>

            {/* Status Messages */}
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

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-brandGreen text-white hover:bg-brandGreenDark"
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
