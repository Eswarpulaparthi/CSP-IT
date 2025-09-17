"use client";
// import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function PlantIdentifier() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    setLoading(true);

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
      });
    try {
      const base64Image = await toBase64(acceptedFiles[0]);
      setFile(base64Image);
      const res = await fetch("/api/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: [base64Image],
        }),
      });

      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.log("Upload error:", error);
    } finally {
      setLoading(false);
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
        {loading ? (
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
      {/*  */}
      {file && !loading && (
        <div className="mt-4 text-center">
          <img
            src={file}
            alt="Uploaded plant"
            className="max-w-full h-64 object-contain mx-auto rounded-lg"
          />
        </div>
      )}
      {results && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Identification Results</h3>
          {/* {results.map((result, index) => ( */}
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">
                scientific Name:{" "}
                {
                  results.identification.result.classification.suggestions[0]
                    .name
                }
              </h4>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                {/* {Math.round(results.identification.result.is_plant.probability)} */}
                100 % match
              </span>
            </div>
            {/* {result.species.commonNames.length > 0 && ( */}
            <p className="text-gray-600 mb-2">
              Health: {results.health.result.disease.suggestions[0].name}
            </p>
            <p className="text-gray-600 mb-2">
              Cure: {results.health.result.disease.suggestions[1].name}
            </p>
            {/* )} */}
          </div>
          {/* ))} */}
        </div>
      )}
    </div>
  );
}
