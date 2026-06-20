import { useRef, useState } from "react";
import { uploadImage } from "../../services/imageService";
import toast from "react-hot-toast";

const AvatarSection = ({
  avatar,
  setAvatar,
  username = "",
}) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const response = await uploadImage(file);

      setAvatar(response.data.url);

    } catch (error) {
      console.log(error.message);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">

      {avatar ? (
        <img
          src={avatar}
          alt="Avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-zinc-700"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-zinc-700 flex items-center justify-center text-4xl font-bold">
          {username.charAt(0).toUpperCase()}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
      >
        {uploading ? "Uploading..." : "Change Photo"}
      </button>

    </div>
  );
};

export default AvatarSection;