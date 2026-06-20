const ImageModal = ({ previewImage, setPreviewImage }) => {
  if (!previewImage) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={() => setPreviewImage(null)}
    >
      <button
        className="absolute top-5 right-5 text-white text-4xl hover:text-gray-300 transition"
        onClick={() => setPreviewImage(null)}
      >
        ✕
      </button>

      <img
        src={previewImage}
        alt="Preview"
        className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default ImageModal;