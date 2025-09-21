"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function PlantUpload() {
  const [identifying, setIdentifying] = useState(false);
  const [results, setResults] = useState(null);
  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setIdentifying(true);

    const formData = new FormData();
    formData.append("images", acceptedFiles[0]);
    formData.append("organs", "leaf");
    try {
      const response = await fetch("/api/identify_2", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        console.log("Identification failed:", data.error || "No results found");
      }
    } catch (error) {
      console.log("Upload error:", error);
    } finally {
      setIdentifying(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-green-400 bg-green-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        {identifying ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
            <span>Identifying plant...</span>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-2">
              {isDragActive
                ? "Drop the image here"
                : "Drag & drop a plant image here, or click to select"}
            </p>
            <p className="text-sm text-gray-500">
              Supports JPEG, PNG, WebP (max 10MB)
            </p>
          </div>
        )}
      </div>

      {results && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Identification Results</h3>
          {results.map((result, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">
                  scientific Name: {result.species.scientificNameWithoutAuthor}
                </h4>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {Math.round(result.score * 100)}% match
                </span>
              </div>
              {result.species.commonNames.length > 0 && (
                <p className="text-gray-600 mb-2">
                  Also known as: {result.species.commonNames.join(", ")}
                </p>
              )}
              <p>{data.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
