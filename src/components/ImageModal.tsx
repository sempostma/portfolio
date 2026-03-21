interface ImageModalProps {
  imageSrc: string | null;
  onClose: () => void;
}

export function ImageModal({ imageSrc, onClose }: ImageModalProps) {
  if (!imageSrc) return null;

  return (
    <div
      id="imgmodal"
      className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <span
        className="absolute top-4 right-9 text-gray-100 text-4xl font-bold cursor-pointer hover:text-white"
        onClick={onClose}
      >
        &times;
      </span>
      <img
        loading="lazy"
        className="max-w-[90%] max-h-[90%] object-contain"
        src={imageSrc}
        alt="Modal"
      />
    </div>
  );
}
