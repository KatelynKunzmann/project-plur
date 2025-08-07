import { useState } from "react";
import { supabase } from "../supabase";

export default function ImageUploader({ image, setImage }) {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `post-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("post-images") // your storage bucket
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return;
    }

    const { data: publicURLData } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath);

    setImage(publicURLData.publicUrl); // ✅ sets public URL
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="mt-2 text-sm text-white"
    />
  );
}
