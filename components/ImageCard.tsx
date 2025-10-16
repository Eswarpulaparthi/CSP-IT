"use client";

interface ImageCardProps {
  title?: string;
  description?: string;
  image: string;
  health?: string;
  user?: string;
}

export default function ImageCard({
  title,
  description,
  image,
  health,
  user,
}: ImageCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-64">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {title && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/30">
            <h3 className="text-white font-bold text-lg truncate">{title}</h3>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        {health && <p className="text-green-600 font-medium">{health}</p>}
        {description && <p className="text-gray-700 text-sm">{description}</p>}
        {user && (
          <p className="text-gray-400 text-xs truncate">Uploaded by: {user}</p>
        )}
      </div>
    </div>
  );
}
