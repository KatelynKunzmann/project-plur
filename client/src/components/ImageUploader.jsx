import { supabase } from "../supabase";

export default function ImageUploader({ setImage }) {
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
  };

  return (
    <label className="mt-2 text-sm font-semibold text-neonYellow border border-neonYellow rounded px-3 py-1 cursor-pointer transition hover:bg-neonYellow hover:text-darkBg hover:shadow-[0_0_10px_#ccff33] hover:scale-105 active:scale-95">
      📸 Upload Image
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </label>
  );
}
