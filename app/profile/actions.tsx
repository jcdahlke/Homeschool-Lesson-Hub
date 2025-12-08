'use server'

import { createClient } from "../../utils/supabase/server";
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ---------------------------------------------------------
// 1. UPDATE PROFILE ACTION
// ---------------------------------------------------------
export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  
  // 1. Get the current authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: "You must be logged in to update your profile." };
  }

  // 2. Extract text data
  const fullName = formData.get("fullName") as string;
  const username = formData.get("username") as string;
  const about = formData.get("about") as string;
  
  // 3. Prepare the update object
  const updates: any = {
    full_name: fullName,
    username: username,
    bio: about,
    // We update the 'updated_at' timestamp if you have one
    // updated_at: new Date().toISOString(), 
  };

  // 4. Handle Profile Image Upload (If your friend adds the input)
  // Your friend needs to add <input type="file" name="profileImage" /> to the form
  const imageFile = formData.get("profileImage") as File;
  
  if (imageFile && imageFile.size > 0) {
    // a. Create a unique file path: public/user_id/random_name
    // NOTE: We removed 'public/' so the path starts with the user ID.
    // This allows Row Level Security (RLS) to verify the user owns this folder.
    const filePath = `${user.id}/${crypto.randomUUID()}-${imageFile.name}`;
    
    // b. Upload to Supabase Storage ('"Profile_Images"' bucket)
    const { error: uploadError } = await supabase
      .storage
      .from('Profile_Images')
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return { error: "Failed to upload image." };
    }

    // c. Get the public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('Profile_Images')
      .getPublicUrl(filePath);

    // d. Add the URL to our database update object
    updates.profile_image = publicUrl;
  }

  // 5. Update the app_user table
  const { error } = await supabase
    .from("app_user")
    .update(updates)
    .eq("supabase_id", user.id); // IMPORTANT: Matching the foreign key

  if (error) {
    console.error("Profile update error:", error);
    return { error: "Failed to update profile. Username might be taken." };
  }

  // 6. Refresh the page so the user sees changes immediately
  // OLD:
  // revalidatePath("/profile");

  // NEW:
  revalidatePath("/", "layout"); 
  return { success: "Profile updated successfully!" };
}

// ---------------------------------------------------------
// 2. UPDATE PASSWORD ACTION
// ---------------------------------------------------------
export async function updatePassword(formData: FormData) {
  const supabase = await createClient();
  
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Basic Validation
  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match." };
  }

  if (newPassword.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  // Security Check: Verify current password first
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) return { error: "User not found" };

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    return { error: "Incorrect current password." };
  }

  // Update the password in Supabase Auth
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath("/profile");
  return { success: "Password updated successfully!" };
}

// ---------------------------------------------------------
// 3. DELETE ACCOUNT ACTION
// ---------------------------------------------------------
export async function deleteAccount() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: "Unauthorized" };
  }

  // Create an Admin Client to perform the deletion
  // Ensure SUPABASE_SERVICE_ROLE_KEY is in your .env.local
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Delete the user from Auth (Cascades to app_user if configured in DB)
  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    console.error("Delete account error:", error);
    return { error: "Failed to delete account." };
  }

  // Sign out and redirect
  await supabase.auth.signOut();
  redirect("/");
}