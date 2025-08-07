import { useRef, useState } from "react";
import { supabase } from "../supabase";

export default function ImageUploader({ setImage }) {
  const fileInputRef = useRef();
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `post-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return;
    }

    const { data: publicURLData } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath);

    setImage(publicURLData.publicUrl);
    setUploadedFileName(file.name);
  };

  return (
    <div className="flex flex-col items-start gap-1 mt-2">
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="text-sm font-semibold text-neonYellow border border-neonYellow rounded px-3 py-1 transition hover:bg-neonYellow hover:text-darkBg hover:shadow-[0_0_10px_#ccff33] hover:scale-105 active:scale-95"
      >
        📸 Upload Image
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {uploadedFileName && (
        <p className="text-xs text-neonGreen">
          ✅ Uploaded: <span className="font-mono">{uploadedFileName}</span>
        </p>
      )}
    </div>
  );
}
