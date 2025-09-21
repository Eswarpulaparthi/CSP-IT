"use client";
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
  if (results) {
    console.log(results.desc);
  }
  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
        {file && !loading && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Uploaded Image
              </h3>
              <div className="relative overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={file}
                  alt="Uploaded plant"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>

            {results && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 space-y-6">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                          Scientific Name
                        </h4>
                        <p className="text-xl font-bold text-gray-700 leading-tight">
                          {
                            results.identification.result.classification
                              .suggestions[0].name
                          }
                        </p>
                      </div>
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                        100% Match
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                        Plant Health
                      </h4>
                      <p className="text-lg font-semibold text-gray-700">
                        {results.health.result.disease.suggestions[0].name}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
                        Recommended Care
                      </h4>
                      <p className="text-lg font-semibold text-gray-700">
                        {results.health.result.disease.suggestions[1].name}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2">
                      Plant Description
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {results.desc}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
