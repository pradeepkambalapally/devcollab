import { useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
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

      toast.success("Profile photo updated!");
    } catch (error) {
      console.log(error.message);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center mb-10">

      {/* Avatar */}
      <div className="relative group">

        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 shadow-xl"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-zinc-700 flex items-center justify-center text-5xl font-bold border-4 border-zinc-600 shadow-xl">
            {username.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Camera Overlay */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110"
        >
          <FiCamera size={18} />
        </button>

      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Upload Status */}
      {uploading && (
        <p className="mt-4 text-sm text-blue-400">
          Uploading image...
        </p>
      )}

      {!uploading && (
        <p className="mt-4 text-sm text-zinc-400">
          Click the camera icon to change your photo
        </p>
      )}

    </div>
  );
};

export default AvatarSection;